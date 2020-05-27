// export default function _generateMockApi (data, delay = 1000) {
//   return () => new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ data });
//     }, delay);
//   });
// }

export default function fetchCategories (delay = 1000) {
  const data = {
    categories: [{
      categoryName: 'HVAC',
      pages: [{
        slug: 'hvac-repair',
        serviceId: '673dcc2c8',
        title: 'HVAC Repair',
      }, {
        slug: 'hvac-maintenance',
        serviceId: '8915df468',
        title: 'HVAC Maintenance',
      }],
    },{
      categoryName: 'BATHROOM',
      pages: [{
        slug: 'bathroom-remodel',
        serviceId: 'd9843b7cb',
        title: 'Bathroom Remodeling',
      }, {
        slug: 'tub-shower-conversion',
        serviceId: 'f939dd56a',
        title: 'Tub & Shower Liner Installation',
      }, {
        slug: 'shower-door-installation',
        serviceId: 'a68d60194',
        title: 'Shower Door Installation',
      }],
    }],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
}
