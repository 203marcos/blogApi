import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname (necessário para ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const API_URL = "https://blogapi-pzwt.onrender.com";

// Configurar o diretório de views com caminho absoluto
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
    console.log("Recebida requisição GET em /");
    console.log("API_URL:", API_URL);

    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log("Resposta do backend:", response.data);
        res.render("index.ejs", { posts: response.data });
    } catch (error) {
        console.error("Erro ao buscar posts do backend:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Route to render the edit page
app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
    console.log("called");
    try {
        const response = await axios.patch(
            `${API_URL}/posts/${req.params.id}`,
            req.body
        );
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
