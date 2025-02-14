import { StatusCodes } from "http-status-codes";

const notFoundMiddlware = (req, res) => {
  console.error(`[404] ${req.method} ${req.originalUrl} - Route not found`);

  const response = {
    success: false,
    message: 'Route not found',
    method: req.method,
    path: req.originalUrl,
  };

  if (req.accepts('json')) {
    return res.status(StatusCodes.NOT_FOUND).json(response);
  }

  return res.status(StatusCodes.NOT_FOUND).send(`
    <h1>404 - Not Found</h1>
    <p>The route <strong>${req.originalUrl}</strong> does not exist on this server.</p>
    <p>Method: ${req.method}</p>
  `);
};

export default notFoundMiddlware;

