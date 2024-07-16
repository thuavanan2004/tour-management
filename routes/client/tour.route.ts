import express, { Router } from "express";

const router: Router = express.Router();

import * as controller from "../../controllers/client/tour.controller";

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/:slugCategory", controller.category);

router.get("/detail/:slug", controller.detail);

export const tourRouter: Router = router;
