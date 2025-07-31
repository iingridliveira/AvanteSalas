import express from "express";
import  {filmesRouter } from "./src/routes/filmes.routes.js"
import { userRoutes } from "./src/routes/user.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";

const app = express();
const PORT = 9000;
app.use(express.json());
app.use("/", filmesRouter);
app.use("/user", userRoutes);
app.use("/", authRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT} 🚀`);
});
