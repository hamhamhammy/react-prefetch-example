// import React, { Component } from 'react';

import Home from './views/Home/Home'
// import store from './store';
// console.log('store = ', store);

// eslint-disable-next-line max-classes-per-file
class AllServices {
  static prefetch () {
    console.log('AllServices prefetch');
  }
}

class Pages {
  static prefetch () {
    console.log('Pages prefetch');
  }
}

class KitchenCost {
  static prefetch () {
    console.log('KitchenCost prefetch');
  }
}

class NationalService {
  static prefetch () {
    console.log('NationalService prefetch');
  }
}

class Modal {
  // static prefetch () {
  //   console.log('Modal prefetch');
  // }
}

class ModalOffer {
  static prefetch () {
    console.log('ModalOffer prefetch');
  }
}

class ModalArticle {
  static prefetch () {
    console.log('ModalArticle prefetch');
  }
}

class Drawer {
  // static prefetch () {
  //   console.log('Drawer prefetch');
  // }
}

class DrawerContentList {
  static prefetch () {
    console.log('DrawerContentList prefetch');
  }
}

class NationalForm {
  static prefetch () {
    console.log('NationalForm prefetch');
  }
}

class NationalReviews {
  static prefetch () {
    console.log('NationalReviews prefetch');
  }
}

class NationalConfirmation {
  static prefetch () {
    console.log('NationalConfirmation prefetch');
  }
}

class LocalService {
  static prefetch () {
    console.log('LocalService prefetch');
  }
}

class LocalForm {
  static prefetch () {
    console.log('LocalForm prefetch');
  }
}

class LocalReviews {
  static prefetch () {
    console.log('LocalReviews prefetch');
  }
}

class LocalConfirmation {
  static prefetch () {
    console.log('LocalConfirmation prefetch');
  }
}

class LocalCity {
  static prefetch () {
    console.log('LocalCity prefetch');
  }
}

class LocalProjects {
  static prefetch () {
    console.log('LocalProjects prefetch');
  }
}

class LeadPage {
  static prefetch () {
    console.log('LeadPage prefetch');
  }
}

class LeadPageForm {
  static prefetch () {
    console.log('LeadPageForm prefetch');
  }
}

class LeadPageConfirmation {
  static prefetch () {
    console.log('LeadPageConfirmation prefetch');
  }
}


const routes = [
  {
    path: '/services',
    name: 'homepage',
    component: Home,
  },
  // {
  //   path: '/services/all',
  //   name: 'all-services',
  //   component: AllServices,
  // },
  // {
  //   path: '/services/pages',
  //   name: 'pages',
  //   component: Pages,
  //   meta: {
  //     noHeaderFooter: true,
  //   },
  // },
  // {
  //   path: '/services/kitchen-cost-value-tool',
  //   name: 'kitchen-cost-tool',
  //   component: KitchenCost,
  //   meta: {
  //     noHeaderFooter: true,
  //   },
  // },

  // National Pages
  {
    path: '/services/c/:slug/:serviceId',
    name: 'national-service-page',
    component: NationalService,
    routes: [
      {
        path: '/services/c/:slug/:serviceId/modal',
        component: Modal,
        routes: [
          {
            path: '/services/c/:slug/:serviceId/modal/offer/:itemIndex',
            name: 'offer-modal',
            component: ModalOffer,
          },
          {
            path: '/services/c/:slug/:serviceId/modal/article',
            name: 'article-modal',
            component: ModalArticle,
          },
        ],
      },
      {
        path: '/services/c/:slug/:serviceId/drawer',
        component: Drawer,
        meta: {
          noScroll: true,
        },
        routes: [
          {
            path: '/services/c/:slug/:serviceId/drawer/content-list',
            name: 'content-list-drawer',
            component: DrawerContentList,
          },
        ],
      },
    ],
  },
  {
    path: '/services/c/:slug/:serviceId/form',
    name: 'national-service-form',
    component: NationalForm,
    meta: {
      noHeaderFooter: true,
    },
  },
  // {
  //   path: '/services/c/:slug/:serviceId/reviews/page/:page',
  //   name: 'national-service-reviews',
  //   component: NationalReviews,
  //   pathToRegexpOptions: { strict: true },
  // },
  // {
  //   path: '/services/c/:slug/:serviceId/confirmation',
  //   name: 'national-service-confirmation',
  //   component: NationalConfirmation,
  //   props: true,
  // },

  // // Local City Pages
  // {
  //   path: '/services/l/:state/:city/:slug/:serviceId',
  //   name: 'local-service-page',
  //   component: LocalService,
  //   meta: {
  //     leadFormPresent: true,
  //   },
  // },
  // {
  //   path: '/services/l/:state/:city/:slug/:serviceId/form',
  //   name: 'local-service-form',
  //   component: LocalForm,
  //   meta: {
  //     noHeaderFooter: true,
  //   },
  // },
  // {
  //   path: '/services/l/:state/:city/:slug/:serviceId/reviews/page/:page',
  //   name: 'local-service-reviews',
  //   component: LocalReviews,
  //   pathToRegexpOptions: { strict: true },
  // },
  // {
  //   path: '/services/l/:state/:city/:slug/:serviceId/confirmation',
  //   name: 'local-service-confirmation',
  //   component: LocalConfirmation,
  //   props: true,
  // },
  // {
  //   path: '/services/l/:state/:city',
  //   name: 'local-service-city',
  //   component: LocalCity,
  // },
  // {
  //   path: '/services/l/:state/:city/:slug/:serviceId/projects/page/:page',
  //   name: 'local-service-projects',
  //   component: LocalProjects,
  // },

  // // External Form
  // {
  //   path: '/services/i/:slug/:serviceId',
  //   component: LeadPage,
  //   routes: [
  //     {
  //       path: '/services/i/:slug/:serviceId/form',
  //       name: 'external-service-form',
  //       component: LeadPageForm,
  //       meta: {
  //         noHeaderFooter: true,
  //         iframe: true,
  //       },
  //     },
  //     {
  //       path: '/services/i/:slug/:serviceId/confirmation',
  //       name: 'external-service-confirmation',
  //       component: LeadPageConfirmation,
  //       props: true,
  //       meta: {
  //         noHeaderFooter: true,
  //         iframe: true,
  //       },
  //     },
  //   ],
  // },
];

export default routes;
