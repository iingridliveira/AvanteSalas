import {Router} from "express";
import fs from "fs";
import path from "path";                                                                               
import { fileURLToPath } from "url";
const filmesRouter = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo JSON
const filePath = path.join(__dirname, "../data/filmes.json");
// 1 - POST

function lerFilmes() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
  const filmes = lerFilmes();
// Função para salvar um array no arquivo JSON
function salvarFilmes(Filmes) {
  fs.writeFileSync(filePath, JSON.stringify(Filmes, null, 2), "utf-8");
}
filmesRouter.post("/filmes", (req, res) => {
  
  const novosFilmes = req.body;
  filmes.push(...novosFilmes);
  salvarFilmes(filmes);
  res.status(201).json({
    message: "Filmes adicionados com sucesso!",
    total: novosFilmes.length,
  });
});

filmesRouter.get("/", (req, res) => {
  
  if (!filmes || filmes.length === 0) {
    return res.status(404).json({ message: "Nenhum filme encontrado" });
  }
  res.json(filmes);
});

// 2 - GET
filmesRouter.get("/favoritos", (req, res) => {
  const favoritos = filmes.filter((filme) => filme.favorito === true);
  res.json(favoritos);
});

// 2 - GET FILTRANDO POR DRAMA
filmesRouter.get("/drama", (req, res) => {
  const favoritos = filmes.filter((filme) => filme.genero === "Drama");
  res.json(favoritos);
});

//
// 2 - GET  FILTROS DOS TOTAIS
filmesRouter.get("/totais", (req, res) => {
  
  if (!filmes || filmes.length === 0) {
    return res.status(404).json({ message: "Nenhum filme encontrado" });
  }
  const total = filmes.length;
  const totalFavoritos = filmes.filter(
    (filme) => filme.favorito === true
  ).length;

  const totalNaoFavoritos = total - totalFavoritos;
  const totalPorGenero = {};
  filmes.forEach((filme) => {
    const genero = filme.genero;
    totalPorGenero[genero] = (totalPorGenero[genero] || 0) + 1;
  });

  res.json({
    total,
    totalNaoFavoritos,
    totalFavoritos,
    totalPorGenero,
  });
});
// 3 - PATCH
// 3 - PATCH
filmesRouter.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = filmes.findIndex((filme) => filme.id === id);

  if (index !== -1) {
    filmes[index] = { id, ...req.body };
    return res
      .status(200)
      .json({ message: "Filme atualizado com sucesso!", filme: filmes[index] });
  } else {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
});

// 4 - DELETE
filmesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = filmes.findIndex((filme) => filme.id === id);

  if (index !== -1) {
    filmes.splice(index, 1);
    return res.status(200).json({ message: "Filme removido com sucesso!" });
  } else {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
});

export{filmesRouter}

