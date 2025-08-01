import { Router } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { userAuth } from "./auth.routes.js";

const resevaRoutes = Router();

const SEGREDO = "fsm1";

resevaRoutes.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/reservas.json"); // Aponto o caminho para arquivo

// Função para ler os usuários do arquivo
function lerReserva() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
function salvarReservas(Reservas) {
  fs.writeFileSync(filePath, JSON.stringify(Reservas, null, 2), "utf-8");
}
const Reservas = lerReserva();
resevaRoutes.get("/reservas", (req, res) => {
  try {
    const dados = jwt.verify(userAuth(req, res), SEGREDO);

   
    res.json({ mensagem: "Token válido", usuario: dados, Reservas });
  } catch (err) {
    res.status(403).json({ mensagem: "Token inválido" });
  }
});
//rotas de mostra salas ativas
resevaRoutes.get("/salas", (req, res) => {
  try {
    const dados = jwt.verify(userAuth(req, res), SEGREDO);

    const resevasLivres = Reservas.filter(
      (reserva) => reserva.disponivel === true
    );
    res.json({ mensagem: "Token válido", usuario: dados, resevasLivres });
  } catch (err) {
    res.status(403).json({ mensagem: "Token inválido" });
  }
});
//rotas de criar reserva
resevaRoutes.post("/reservar", (req, res) => {
  try {
    const dados = jwt.verify(userAuth(req, res), SEGREDO);

    const novosReservas = req.body;
    Reservas.push(...novosReservas);
    salvarReservas(Reservas);

    res.json({ mensagem: "sala criada", usuario: dados });
  } catch (err) {
    res.status(403).json({ mensagem: "Token inválido" });
  }
});
export { resevaRoutes };
