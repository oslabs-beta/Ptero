import { writable } from "svelte/store";

const IndexBars = writable([]);
const Logs = writable([]);
const Totals = writable({});

let tempLogs = [];
let tempTotals = {};
let tempIndexBars = [];

const fetchLogs = async () => {
  tempLogs = [];
  const url = "http://localhost:9000/log";
  const res = await fetch(url);
  const data = await res.json();
  const loadedLogs = data.data.map((data, index: number) => {
    return {
      id: index + 1,
      time: data.timeAccessed,
      method: data.method,
      route: data.route,
      status: data.status,
      respTime: data.responseTime,
      key: data.APIkey,
      ip: data.ipAddress,
      cached: data.fromCache,
    };
  });
  tempLogs = await loadedLogs;
  await Logs.set(tempLogs.reverse());

  totalsCalc();
  indexStackedBars();
  // histogramCalc();
};

//'Totals' computation
const totalsCalc = async () => {
  tempTotals = { 200: "200", 404: "404", 500: "500" };
  // await Logs.forEach((el) => {
  //   if (el.status === 200) tempTotals["200"];
  //   else if (el.status === 404) tempTotals["404"]++;
  //   else if (el.status === 500) tempTotals["500"]++;
  // });
  // console.log(tempTotals);
  await Totals.set(tempTotals);
  // console.log(tempTotals);
  //END OF 'Totals' computation
};

const indexStackedBars = async () => {
  // { route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 1 },
  const routeObj = {};
  tempIndexBars = [];
  tempLogs.forEach((el, index) => {
    const test = {};
    test["route"] = el.route;
    if(!routeObj[el.route]) {
      routeObj[el.route] = test;
      routeObj[el.route]['GET'] = 0;
      routeObj[el.route]['POST'] = 0;
      routeObj[el.route]['PUT'] = 0;
      routeObj[el.route]['DELETE'] = 0;
      routeObj[el.route]['id'] = index + 1;
      routeObj[el.route]['tot'] = 0;
    }
    if(el.method === 'GET') routeObj[el.route]['GET'] += 1;
    else if(el.method === 'POST') routeObj[el.route]['POST'] += 1;
    else if(el.method === 'PUT') routeObj[el.route]['PUT'] += 1;
    else if(el.method === 'DELETE') routeObj[el.route]['DELETE'] += 1;
    routeObj[el.route]['tot'] += 1;
  });

  for(const route in routeObj){
    tempIndexBars.push(routeObj[route]);
  }

  await tempIndexBars.sort((a, b) => { return b['tot'] - a['tot']})
  await tempIndexBars.forEach((element, index) => {element.id = index + 1});
  await IndexBars.set(tempIndexBars);
  console.log(tempIndexBars);
};

//Histogram computation
// const histogramCalc = async () => {
// };
// const indexStackedBars = async () => {
//   // { route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 1 },
//   const tempArray = [];
//   tempLogs.forEach((el) => {
//     const tempObj = {route: el.route};
//     if(!tempArray.includes(tempObj)){
//        tempArray.push(tempObj)
//     }
//   })
//   console.log(tempArray);
// }

//   console.log(tempArray);
// };
// //Histogram computation
// const IndexBarsCalc = async () => {
//   //route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 1
//   const routeArr = [];
//   tempLogs.forEach(el => {
//     if(!routeArr[el.route]) routeArr.push(el.route);

//   })
// };

fetchLogs();
export { Logs, Totals, IndexBars };
