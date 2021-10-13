import { writable } from "svelte/store";

const Logs = writable([]);
const Totals = writable({});
const IndexBars = writable([]);

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
  await Logs.set(tempLogs);

  totalsCalc();
  histogramCalc();
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

//Histogram computation
// const histogramCalc = async () => {
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
export { Logs, Totals };
