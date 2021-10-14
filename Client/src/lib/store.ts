import { writable } from "svelte/store";

const IndexBars = writable([]);
const Logs = writable([]);
const TotalsStatus = writable([]);
const CachedvsNotCached = writable({});

let tempLogs = [];
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

  totalsPerStatus();
  indexStackedBars();
  avgRspTimeCvsNC();
};

const totalsPerStatus = async () => {
  const tempStatusTotals = {};
  const tempStatus = [];

  await tempLogs.forEach((el) => {
    if (!tempStatusTotals[el.status]) tempStatusTotals[el.status] = 0;
    tempStatusTotals[el.status] += 1;
  });
  console.log(tempStatusTotals);
  for (const status in tempStatusTotals) {
    const temp = {};
    temp[status] = tempStatusTotals[status];
    tempStatus.push(temp);
  }
  console.log(tempStatus);
  TotalsStatus.set(tempStatus);
};

const indexStackedBars = async () => {
  // { route: '/test', GET: 3840, POST: 1920, PUT: 960, DELETE: 400, id: 1 },
  const routeObj = {};
  tempIndexBars = [];
  tempLogs.forEach((el, index) => {
    const test = {};
    test["route"] = el.route;
    if (!routeObj[el.route]) {
      routeObj[el.route] = test;
      routeObj[el.route]["GET"] = 0;
      routeObj[el.route]["POST"] = 0;
      routeObj[el.route]["PUT"] = 0;
      routeObj[el.route]["DELETE"] = 0;
      routeObj[el.route]["id"] = index + 1;
      routeObj[el.route]["tot"] = 0;
    }
    if (el.method === "GET") routeObj[el.route]["GET"] += 1;
    else if (el.method === "POST") routeObj[el.route]["POST"] += 1;
    else if (el.method === "PUT") routeObj[el.route]["PUT"] += 1;
    else if (el.method === "DELETE") routeObj[el.route]["DELETE"] += 1;
    routeObj[el.route]["tot"] += 1;
  });

  for (const route in routeObj) {
    tempIndexBars.push(routeObj[route]);
  }

  await tempIndexBars.sort((a, b) => {
    return b["tot"] - a["tot"];
  });
  await tempIndexBars.forEach((element, index) => {
    element.id = index + 1;
  });
  await IndexBars.set(tempIndexBars);
};

// time: data.timeAccessed,
// method: data.method,
// route: data.route,
// status: data.status,
// cached: data.fromCache,

//   {
//     date: {
//       total: #,
//       details: {
//         route: #,
//         total: #,
//         status: {
//           200: #,
//           404: #
//         },
//         cached: {
//           cached: #,
//           notCached: #
//         }
//       }
//     }
// }

// [{name: route, data: [{x: date, y: #}]}, {name: route, data: [{x: date, y: #}]}, ... ]

// const routePerDay = async () => {
//   const data = {
//     date: {
//       total: 0,
//       details: {
//         route: '',
//         total: 0,
//         status: {
//           200: 0,
//           404: 0,
//         },
//         cached: {
//           cached: 0,
//           notCached: 0,
//         },
//       },
//     },
//   };

//   tempLogs.forEach((logs) => {
//
//   });
// };

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

//AVERAGE RESPONSE TIME CACHED VS NON CACHED
const avgRspTimeCvsNC = async () => {
  //return obj like {cached: 56, notCached: 300}
  // 56ms/300ms
  const avg = { cached: 0, notCached: 0 };
  //define 2 vars or an object
  const cached = { time: 0, num: 0 };
  const notCached = { time: 0, num: 0 };
  //iterate through the arrayLog

  tempLogs.forEach((logs) => {
    //IF cached = true
    if (logs.cached === true) {
      cached.time = cached.time + parseInt(logs.respTime, 10);
      cached.num += 1;
    } else {
      notCached.time += parseInt(logs.respTime, 10);
      notCached.num += 1;
    }
  });
  avg.cached = Math.floor(cached.time / cached.num);
  avg.notCached = Math.floor(notCached.time / notCached.num);
  console.log(avg);
  CachedvsNotCached.set(avg);
};

fetchLogs();
export { CachedvsNotCached, IndexBars, Logs, TotalsStatus };
