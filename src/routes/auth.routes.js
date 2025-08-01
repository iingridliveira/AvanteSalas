import { Router } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const authRoutes = Router();

const SEGREDO = "fsm1";

authRoutes.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/usuarios.json"); // Aponto o caminho para arquivo

// Função para ler os usuários do arquivo
function lerUsuarios() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
function userAuth(req, res) {
  try{
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  //console.log(auth);

  if (!token) {
    return res.status(401).json({ mensagem: "Token não enviado" });
  } else {
    return token;
  }} catch (err) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
}


function admAuth(req, res) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não enviado" });
  }

  try {
    const decoded = jwt.verify(token, SEGREDO);
   // console.log(decoded);
    if (decoded.Role === "admin") {
      // Token is valid and has admin role
      return token;
    } else {
      return res.status(403).json({ mensagem: "Acesso negado" });
    }
  } catch (err) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
}// Rota de login (gera o token se nome e senha estiverem certos)
authRoutes.post("/login", (req, res) => {
  const { nome, senha } = req.body;
  const usuarios = lerUsuarios();

  const usuario = usuarios.find((u) => u.nome === nome && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: "Usuário ou senha incorretos" });
  }

  const token = jwt.sign(
    { nome: usuario.nome, Role: usuario.Role },
    SEGREDO
  );
  res.json({ token });
});

// Rota que verifica o token (retorna os dados do usuário autenticado)
authRoutes.get("/check", (req, res) => {
  try {
    const dados = jwt.verify(userAuth(req, res), SEGREDO);
    res.json({ mensagem: "Token válido", usuario: dados });
  } catch (err) {
    res.status(403).json({ mensagem: "Token inválido" });
  }
});

// Inicia o servidor

export { authRoutes, userAuth, admAuth };
