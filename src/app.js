import express from "express";
import trabajadorRoutes from "./routes/trabajador-routes.js";
import clienteRoutes from "./routes/cliente-routes.js";

const app = express();
app.use(express.json()); 

app.use("/trabajador", trabajadorRoutes);
app.use("/cliente", clienteRoutes);

export default app;