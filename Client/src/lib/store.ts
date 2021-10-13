import { writable } from "svelte/store";

const Logs = writable([]);
const Totals = writable({});

let tempLogs = [];
let tempTotals = {};

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

  tempTotals = { 200: "200", 404: "404", 500: "500" };
  // await Logs.forEach((el) => {
  //   if (el.status === 200) tempTotals["200"];
  //   else if (el.status === 404) tempTotals["404"]++;
  //   else if (el.status === 500) tempTotals["500"]++;
  // });
  // console.log(tempTotals);
  await Totals.set(tempTotals);
  // console.log(tempTotals);
};

fetchLogs();
export { Logs, Totals };
