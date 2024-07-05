import { homeRouter } from "./home.route";
import { tourRouter } from "./tour.route";

const clientRouter = (app) => {
  app.use("/", homeRouter);

  app.use("/tours", tourRouter);
};

export default clientRouter;
