import { writable } from "svelte/store";

/** Store for your data.
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const logs = writable([]);
