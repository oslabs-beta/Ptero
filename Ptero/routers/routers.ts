import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
} from "../controllers/dinosaurs.ts";

const pteroRouter = new Router();

pteroRouter.get("/dinosaurs", getDinosaurs);
pteroRouter.get("/dinosaurs/:id", getDinosaur);
pteroRouter.post("/dinosaurs", addDinosaur);
pteroRouter.put("/dinosaurs/:id", updateDinosaur);
pteroRouter.delete("/dinosaurs/:id", deleteDinosaur);

export default pteroRouter;
