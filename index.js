import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("Variáveis de ambiente carregadas:",)

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
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar posts" });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: "Post não encontrado" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar post" });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar post" });
    }
});

app.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!post)
            return res.status(404).json({ message: "Post não encontrado" });
        res.json(post);
    } catch (err) {
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
