import { pathToRegexp } from 'path-to-regexp';

import routesConfig from './router';

const store = 'I am the store'; // replace with real store

// const { log } = console;

export function getMatchedComponents (route) {
  const results = [];
  let found = false;
  let level = routesConfig;

  while (true) {
    const routes = level.map(config => ({
      ...config,
      exact: pathToRegexp(config.path, [], { start: true, end: true }),
      start: pathToRegexp(config.path, [], { start: true, end: false }),
    }));

    const [exact] = routes.filter(config => config.exact.test(route));
    const [start] = routes.filter(config => config.start.test(route) && config.routes);

    if (exact) {
      results.push(exact.component); // component.prefetch
      found = true;
      break; // Found exact so break
    } else if (start) { // Found the first route that matched start and has child routes
      results.push(start.component); // component.prefetch
      level = start.routes;
    } else {
      break; // Found nothing so break
    }
  }

  return (found ? results : []).filter(component => Boolean(component && component.prefetch));
}

export async function doPrefetch (route, successCallback = () => {}, errorCallback = () => {}) {
  const components = getMatchedComponents(route);
  const prefetchHooks = components.map(component => component.prefetch);
  try {
    const results = await Promise.all(prefetchHooks.map(hook => hook({ store })));
    successCallback(results);
  } catch (e) {
    errorCallback(e);
  }
}

// GOOD ROUTES
// var matched = getMatchedComponents('/services', routes)
// var matched = getMatchedComponents('/services/all', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/modal', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/modal/offer/1', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/drawer/content-list', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/form', routes)
// var matched = getMatchedComponents('/services/i/hvac-install/db567bhf/confirmation', routes)

// BAD ROUTES
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/drawer/offer/1', routes)
// var matched = getMatchedComponents('/services/c/hvac-repair/673dcc2c8/foobar', routes)


// debugger;

// if (!Boolean(matched.length)) {
//   log('No matched components found');
// } else {
//   log('Printing matched prefetch')
//   matched.forEach((component) => {
//     component.prefetch();
//   });
// }

// log(matched); // Homepage
