import express from "express";
import session from "express-session";
import type {Request, Response } from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import abrigoRoutes from "./routes/abrigoRoutes.js";
import { swaggerDocument } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set("json spaces", 2);
app.use(session({
    secret: process.env.SESSION_SECRET || "dev-session-secret-change-before-deploy",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(usuarioRoutes);
app.use(animalRoutes);
app.use(abrigoRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
    res.status(200).sendFile('index.html', { root: 'public'});
});

app.get("/conta", (req: Request, res: Response) => {
    res.status(200).sendFile('conta.html', { root: 'public'});
});

app.get("/minha-conta", (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    return res.sendFile("minha-conta.html", { root: "public" });
});

app.get("/cadastro", (req: Request, res: Response) => {
    res.status(200).sendFile('cadastro.html', { root: 'public'});
});

app.get("/login", (req: Request, res: Response) => {
    res.status(200).sendFile('login.html', { root: 'public'});
});

app.get("/abrigos", (req: Request, res: Response) => {
    res.status(200).sendFile('abrigos.html', { root: 'public'});
});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

app.get("/animais", (req: Request, res: Response) => {
    return res.sendFile("animais.html", { root: "public" });
});

export default app;