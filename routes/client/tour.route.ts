import express, { Router } from "express";

const router: Router = express.Router();

import * as controller from "../../controllers/client/tour.controller";

router.get("/", controller.index);

export const tourRouter: Router = router;
