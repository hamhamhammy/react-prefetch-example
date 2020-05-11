const fs = require('fs');
const path = require('path');
const { createWebpackDevConfig } = require("@craco/craco");

// Generate webpack config with CLI service
// const webpackConfig = require('@vue/cli-service/webpack.config.js'); // eslint-disable-line

// Generate a webpack config with Craco
const cracoConfig = require("../craco.config.js");
const webpackDevConfig = createWebpackDevConfig(cracoConfig);

// Create express app
const express = require('express');

const ExpressGraphQL = require('express-graphql');

// Configure webpack as middleware
const webpack = require('webpack'); // eslint-disable-line
const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line

const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const monitor = require('express-status-monitor');
const lusca = require('lusca');
const chalk = require('chalk');

const schema = require("./graphql/schema.js");

const apiRouter = require('./api');

const { NODE_ENV } = process.env;

const isDev = NODE_ENV !== 'production';
const isProd = !isDev;
const isProdLocal = isProd && process.argv.includes('--local');

const port = isProd ? 443 : 3000; // 443 is https default

const { log } = console;

const app = express();

log('isDev = ', isDev);

app.use(monitor({
  path: '/_status',
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(lusca({
  csrf: false, // TODO - switch this back to prod
  xframe: 'SAMEORIGIN',
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xssProtection: true,
  nosniff: true,
  referrerPolicy: 'same-origin',
}));

app.use(express.static('build', { index: false })); // Never send the raw index from /build
app.use(express.static('public', { index: false })); // Never send the raw index from /public

app.use('/api', apiRouter);
app.use("/graphql", ExpressGraphQL({ schema: schema.schema, graphiql: true}));

if (isDev) {
  // log(webpackDevConfig)
  // webpackDevConfig.entry.app.unshift('webpack-hot-middleware/client');
  webpackDevConfig.entry.shift(); // Remove local webpack hot
  webpackDevConfig.entry.unshift('webpack-hot-middleware/client');
  webpackDevConfig.entry.unshift('react-hot-loader/patch');
  const compiler = webpack(webpackDevConfig);
  app.use(devMiddleware(compiler, {
    noInfo: false,
    publicPath: webpackDevConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
  }));

  app.use(hotMiddleware(compiler, {
    log,
  }));

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
      return undefined;
    });
  });

  // Dev server
  http.createServer(app).listen(port, () => {
    const url = `http://localhost:${port}`;
    log(`Express server started (${NODE_ENV}) ${chalk.cyanBright(url)}`);
  });
} else if (isProdLocal) {
  // Prod server local for testing
  const httpsKey = path.join(__dirname, '/certs/local-server.key');
  const httpsCert = path.join(__dirname, '/certs/local-server.cert');

  if (!fs.existsSync(httpsKey) || !fs.existsSync(httpsCert)) {
    log(chalk.bgRed('Prod local Error missing required cert or key file(s)'));
    return;
  }

  app.use('*', (req, res) => {
    const indexFile = path.resolve(__dirname, '../build/index.html');
    res.sendFile(indexFile);
  });

  https.createServer({
    key: fs.readFileSync(httpsKey),
    cert: fs.readFileSync(httpsCert),
  }, app).listen(port, () => {
    const url = `https://localhost:${port}`;
    log(`Express server started (${NODE_ENV} - local) ${chalk.cyanBright(url)}`);
  });
} else {
  // Prod server
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/yobumper.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/yobumper.com/cert.pem', 'utf8');
  const chain = fs.readFileSync('/etc/letsencrypt/live/yobumper.com/chain.pem', 'utf8');

  const httpApp = express();

  // TODO - switch to using nginx to get rid of this
  httpApp.use('*', (req, res) => { // Always redirect to https
    res.redirect(`https://${req.headers.host}${req.url}`);
  });

  app.use('*', (req, res) => {
    const indexFile = path.resolve(__dirname, '../build/index.html');
    res.sendFile(indexFile);
  });

  http.createServer(httpApp).listen(80);

  https.createServer({
    key: privateKey,
    cert: certificate,
    ca: chain,
  }, app).listen(port, () => {
    const url = `https://localhost:${port}`;
    log(`Express server started (${NODE_ENV}) ${chalk.cyanBright(url)}`);
  });
}
