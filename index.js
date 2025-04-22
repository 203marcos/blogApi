import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Conexão com o MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Modelo do Post
const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.get("/posts", async (req, res) => {
    console.log("Recebida requisição GET em /posts");
    try {
        const posts = await Post.find();
        console.log("Posts encontrados:", posts);
        res.json(posts);
    } catch (err) {
        console.error("Erro ao buscar posts:", err);
        res.status(500).json({ message: "Erro ao buscar posts" });
    }
});

app.get("/posts/:id", async (req, res) => {
    console.log(`Recebida requisição GET em /posts/${req.params.id}`);
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log("Post não encontrado:", req.params.id);
            return res.status(404).json({ message: "Post não encontrado" });
        }
        console.log("Post encontrado:", post);
        res.json(post);
    } catch (err) {
        console.error("Erro ao buscar post:", err);
        res.status(500).json({ message: "Erro ao buscar post" });
    }
});

app.post("/posts", async (req, res) => {
    console.log("Recebida requisição POST em /posts com body:", req.body);
    try {
        const post = new Post(req.body);
        await post.save();
        console.log("Post criado com sucesso:", post);
        res.status(201).json(post);
    } catch (err) {
        console.error("Erro ao criar post:", err);
        res.status(500).json({ message: "Erro ao criar post" });
    }
});

app.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Retorna o documento atualizado
        });
        if (!post)
            return res.status(404).json({ message: "Post não encontrado" });
        res.json(post);
    } catch (err) {
        console.error("Erro ao atualizar post:", err);
        res.status(500).json({ message: "Erro ao atualizar post" });
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(404).json({ message: "Post não encontrado" });
        res.json({ message: "Post deletado" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar post" });
    }
});

app.listen(port, () => {
    console.log(`API está rodando em http://localhost:${port}`);
});
