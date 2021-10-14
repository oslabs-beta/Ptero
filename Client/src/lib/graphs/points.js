const tsv = `route	1960	1961	1962	1963	1964	1965	1966	1967	1968	1969	1970	1971	1972	1973	1974	1975	1976	1977	1978	1979	1980	1981	1982	1983	1984	1985	1986	1987	1988	1989	1990	1991	1992	1993	1994	1995	1996	1997	1998	1999	2000	2001	2002	2003	2004	2005	2006	2007	2008	2009	2010	2011	2012	2013	2014	2015	2016	2017	2018	2019
/Dinosaurs	69.29	69.60	69.52	69.77	70.23	70.34	70.57	70.68	70.73	70.68	71.00	71.11	71.41	71.53	71.83	71.92	72.13	72.41	72.52	72.77	72.86	73.20	73.46	73.53	73.80	73.88	74.14	74.39	74.58	74.74	74.87	74.97	75.29	75.40	75.69	75.82	76.07	76.36	76.60	76.83	77.16	77.49	77.61	77.69	78.19	78.37	78.74	78.97	79.18	79.44	79.73	80.24	80.25	80.53	80.92	80.62	80.97	80.99
France	69.87	70.12	70.31	70.51	70.66	70.81	70.96	71.16	71.31	71.46	71.66	71.91	72.11	72.36	72.60	72.85	73.10	73.35	73.60	73.85	74.05	74.30	74.50	74.80	75.00	75.30	75.60	75.80	76.10	76.35	76.60	76.85	77.10	77.30	77.65	77.75	77.95	78.30	78.60	78.76	79.06	79.16	79.26	79.11	80.16	80.16	80.81	81.11	81.21	81.41	81.66	82.11	81.97	82.22	82.67	82.32	82.52	82.52
United Kingdom	71.13	70.88	70.93	70.83	71.62	71.62	71.57	72.12	71.72	71.72	71.97	72.27	72.12	72.32	72.52	72.72	72.78	73.22	73.18	73.28	73.68	74.03	74.18	74.38	74.78	74.63	74.93	75.28	75.38	75.58	75.88	76.08	76.43	76.39	76.89	76.84	77.09	77.21	77.19	77.39	77.74	77.99	78.14	78.45	78.75	79.05	79.25	79.45	79.60	80.05	80.40	80.95	80.90	81.00	81.30	80.96	81.16	81.16
Greenland																			63.41	63.95	63.45	63.07	63.19	63.30	63.47	63.83	64.25	64.65	64.58	64.67	65.07	65.03	65.20	65.59	65.90	65.64	65.77	65.80	66.16	66.40	66.96	67.61	68.16	68.44	68.81	69.22	69.52	69.98	70.21	70.47	70.86	71.06	71.30	71.83	71.54	71.25
Japan	67.67	68.31	68.59	69.66	70.13	70.20	70.99	71.28	71.61	71.84	71.95	72.88	73.51	73.76	74.39	75.06	75.46	75.90	76.04	76.34	76.09	76.41	76.92	76.96	77.37	77.65	78.06	78.48	78.40	78.82	78.84	79.10	79.15	79.29	79.69	79.54	80.20	80.42	80.50	80.57	81.08	81.42	81.56	81.76	82.03	81.93	82.32	82.51	82.59	82.93	82.84	82.59	83.10	83.33	83.59	83.79	83.98	84.10
Korea, Rep.	55.42	56.01	56.51	56.97	57.44	57.97	58.58	59.24	59.94	60.68	62.16	62.61	63.01	63.41	63.80	64.15	64.50	64.90	65.20	65.55	66.05	66.55	67.10	67.55	68.20	68.80	69.45	70.00	70.55	71.05	71.60	72.05	72.50	73.00	73.40	73.70	74.15	74.60	75.00	75.41	75.91	76.41	76.77	77.21	77.67	78.17	78.67	79.12	79.52	79.97	80.12	80.57	80.82	81.27	81.72	82.02	82.28	82.63
United States	69.77	70.27	70.12	69.92	70.17	70.21	70.21	70.56	69.95	70.51	70.81	71.11	71.16	71.36	71.96	72.60	72.86	73.26	73.36	73.80	73.61	74.01	74.36	74.46	74.56	74.56	74.61	74.77	74.77	75.02	75.21	75.37	75.62	75.42	75.62	75.62	76.03	76.43	76.58	76.58	76.64	76.84	76.94	77.04	77.49	77.49	77.69	77.99	78.04	78.39	78.54	78.64	78.74	78.74	78.84	78.69	78.54	78.54`;

const rows = tsv.split('\n').map((str) => str.split('\t'));
const headers = rows.shift();
const day = headers.slice(1).map((n) => +n);

const route = rows.map((row) => {
	return {
		name: row[0],
		data: day
			.map((year, i) => ({
				x: year,
				y: +row[i + 1]
			}))
			.filter((d) => d.y)
	};
});

console.log(route[0]['data']);

export { day, route };

// import { Logs, } from '../store.ts';
// // "route" to "endpoints". "day" to "days". "y" to "vists per day"
// const days = ["oct1", "oct2"]
// const endpoints = Logs.map((row) => {
// 	row
// })

// // console.log("route[0]: ", route[0]);

// export { endpoints, days };
