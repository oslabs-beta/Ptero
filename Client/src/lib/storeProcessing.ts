/* This file is used to store the different functions supporting the computation
* of the difference pieces of state used in the graphs */

const totalsPerStatus = async (tempLogs, TotalsStatus) => {
  const totalsPerStatusObj = {};
  const totalsPerStatusArr = [];

  await tempLogs.forEach((el: any) => {
    if (!totalsPerStatusObj[el.status]) totalsPerStatusObj[el.status] = 0;
    totalsPerStatusObj[el.status] += 1;
  });
  // console.log(tempStatusTotals);
  for (const status in totalsPerStatusObj) {
    const temp = {};
    temp[status] = totalsPerStatusObj[status];
    totalsPerStatusArr.push(temp);
  }
  // console.log(tempStatus);
  TotalsStatus.set(totalsPerStatusArr);
  return;
};

const reqPerEndpointAndMethodFn = async (tempLogs, ReqPerEndpointAndMethod) => {
  const routeObj = {};
  const tempIndexBars = [];

  tempLogs.forEach((el: any, index: number) => {
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
  await ReqPerEndpointAndMethod.set(tempIndexBars);
  console.log(tempIndexBars);
  return;
};

const reqPerStatusAndMethodProcess = async (
  tempLogs,
  ReqPerStatusAndMethod,
) => {
  const statusObj = {};
  const tempStatusObj = [];

  tempLogs.forEach((el: any, index: number) => {
    const test = {};
    test["status"] = el.status;
    if (!statusObj[el.status]) {
      statusObj[el.status] = test;
      statusObj[el.status]["GET"] = 0;
      statusObj[el.status]["POST"] = 0;
      statusObj[el.status]["PUT"] = 0;
      statusObj[el.status]["DELETE"] = 0;
      statusObj[el.status]["id"] = index + 1;
      statusObj[el.status]["tot"] = 0;
    }
    if (el.method === "GET") statusObj[el.status]["GET"] += 1;
    else if (el.method === "POST") statusObj[el.status]["POST"] += 1;
    else if (el.method === "PUT") statusObj[el.status]["PUT"] += 1;
    else if (el.method === "DELETE") statusObj[el.status]["DELETE"] += 1;
    statusObj[el.status]["tot"] += 1;
  });

  for (const route in statusObj) {
    tempStatusObj.push(statusObj[route]);
  }

  await tempStatusObj.sort((a, b) => {
    return b["tot"] - a["tot"];
  });
  await tempStatusObj.forEach((element, index) => {
    element.id = index + 1;
  });
  await ReqPerStatusAndMethod.set(tempStatusObj);
  console.log(tempStatusObj);
  return;
};

const avgRspTimeCvsNC = async (tempLogs, CachedvsNotCached) => {
  const avg = { cached: 0, notCached: 0 };
  const cached = { time: 0, num: 0 };
  const notCached = { time: 0, num: 0 };

  tempLogs.forEach((logs) => {
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
  CachedvsNotCached.set(avg);
  return;
};

const routePerDay = async (tempLogs, DailyData, DayRouteTotal) => {
  const tempDailyData = {};
  await tempLogs.forEach((log: any) => {
    const route = log.route;
    const date = log.time;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    // const strDate = `${year}/${month}/${day}`;
    const strDate = day;

    if (!tempDailyData[strDate]) {
      tempDailyData[strDate] = {};
      tempDailyData[strDate]["totals"] = 0;
    }
    tempDailyData[strDate]["totals"] += 1;
    if (!tempDailyData[strDate][route]) {
      tempDailyData[strDate][route] = {
        "total": 0,
        "status": {},
        "cached": { "cached": 0, "notCached": 0 },
      };
    }
    tempDailyData[strDate][route]["total"] += 1;
    if (log.cached === true) {
      tempDailyData[strDate][route]["cached"]["cached"] += 1;
    } else tempDailyData[strDate][route]["cached"]["notCached"] += 1;

    if (!tempDailyData[strDate][route]["status"][log.status]) {
      tempDailyData[strDate][route]["status"][log.status] = 0;
    }
    tempDailyData[strDate][route]["status"][log.status] += 1;
  });

  DailyData.set(tempDailyData);

  let tempDayRouteTotal = [];
  let id = 0;
  for (let key in tempDailyData) {
    for (let route in tempDailyData[key]) {
      if (route !== "totals") {
        const currentObj = {};
        currentObj["date"] = parseInt(key);
        currentObj["route"] = route;
        currentObj["total"] = tempDailyData[key][route]["total"];
        currentObj["id"] = id;
        tempDayRouteTotal.push(currentObj);
        id++;
      }
    }
  }
  DayRouteTotal.set(tempDayRouteTotal);
  return;
};

const RouteHistoryProcess = async (tempLogs, RouteHistory) => {
  const tempRouteDaily = {};
  await tempLogs.forEach((log: any) => {
    const route = log.route;
    const date = log.time;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const strDate = `${day}`;

    if (!tempRouteDaily[route]) tempRouteDaily[route] = {};
    if (!tempRouteDaily[route][strDate]) tempRouteDaily[route][strDate] = 0;
    tempRouteDaily[route][strDate]++;
  });

  const allDays = [];
  for (const key in tempRouteDaily) {
    for (const day in tempRouteDaily[key]) {
      // console.log(day);
      if (!allDays.includes(day)) allDays.push(day);
    }
  }

  const DailyCallsPerRoute = [];
  for (const key in tempRouteDaily) {
    const currentObj = { name: "", data: [] };
    currentObj.name = key;
    for (const day in allDays) {
      if (tempRouteDaily[key][allDays[day]]) {
        const tempDate = {};
        tempDate.x = parseFloat(allDays[day]);
        tempDate.y = tempRouteDaily[key][allDays[day]];
        currentObj.data.push(tempDate);
      }
    }
    DailyCallsPerRoute.push(currentObj);
  }
  RouteHistory.set(DailyCallsPerRoute);
  console.log(DailyCallsPerRoute);
  return;
};

export {
  avgRspTimeCvsNC,
  reqPerEndpointAndMethodFn,
  reqPerStatusAndMethodProcess,
  RouteHistoryProcess,
  routePerDay,
  totalsPerStatus,
};
