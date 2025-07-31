import { Router } from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const userRoutes = Router();
// IMPORTAÇÕES E INSTANCIAÇÕES



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/usuarios.json'); // Aponto o caminho para arquivo

// Função para ler o conteúdo do arquivo e converter para array
function lerUsuarios() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Função para salvar um array no arquivo JSON
function salvarUsuarios(usuarios) {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
}

// GET (listar todos os usuários)
userRoutes.get("/", (req, res) => {
    const usuarios = lerUsuarios();
    res.send(usuarios);
});

// POST (adicionar um novo usuário)
userRoutes.post("/", (req, res) => {
    const usuarios = lerUsuarios();
    const usuario = req.body;
    usuarios.push(usuario);
    salvarUsuarios(usuarios);
    res.send("Usuário adicionado com sucesso!");
});

// PUT (atualizar um usuário pelo ID)
userRoutes.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarios = lerUsuarios();
    const index = usuarios.findIndex(usuario => usuario.id === id);

    if (index !== -1) {
        usuarios[index] = { id, ...req.body };
        salvarUsuarios(usuarios);
        res.send("Usuário atualizado com sucesso!");
    } else {
        res.status(404).send("Usuário não encontrado.");
    }
});

// DELETE (remover um usuário pelo ID)
userRoutes.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarios = lerUsuarios();
    const index = usuarios.findIndex(usuario => usuario.id === id);

    if (index !== -1) {
        usuarios.splice(index, 1);
        salvarUsuarios(usuarios);
        res.send("Usuário deletado com sucesso!");
    } else {
        res.status(404).send("Usuário não encontrado");
    }
});

// 
export { userRoutes };