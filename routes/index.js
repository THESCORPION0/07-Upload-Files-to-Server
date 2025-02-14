import errorHandlerMiddleware from "../middleware/error-handler.js";
import notFoundMiddlware from "../middleware/not-found.js";
import productsRoute from "./productsRoute.js";
import authRoute from "./authRoute.js";
import usersRoute from "./userRoute.js";

const mountRoutes = (app) => {
  app.use('/api/v1/products', productsRoute);
  app.use('/api/v1/users', usersRoute);
  app.use('/api/v1/auth', authRoute);


  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddlware)
}

export default mountRoutes;