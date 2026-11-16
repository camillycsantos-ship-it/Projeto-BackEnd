import mongoose from "mongoose";
import express, { response } from "express";
import session from "express-session";
import type {Request, Response } from "express";
import Animal from  "./models/Animal.js";
import type { Animal as AnimalDocument } from "./models/Animal.js";
import Usuario from "./models/Usuario.js";
import Abrigo from "./models/Abrigo.js";

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

app.get("/api/abrigos", async (req: Request, res: Response) => { //------1ABRIGO----//
});

app.get("/animais", (req: Request, res: Response) => {
    return res.sendFile("animais.html", { root: "public" });
});

app.post("/abrigos", async (req: Request, res: Response) => {//-----------2ABRIGO-----//
    
});

app.post("/cadastro", async (req: Request, res: Response) => { //-----3USUARIO
});


app.post("/login", async (req: Request, res: Response) => { //-------4USUARIO
});

app.post("/logout", (req: Request, res: Response) => { //--------5USUARIO--------
});


app.get("/api/minha-conta", async (req: Request, res: Response) => { //------1USUARIO---
});

app.get("/api/usuarios/:id", async (req: Request<{id: string}>, res: Response) => { //----2USUArIO
});

app.post("/api/adocoes", async (req: Request, res: Response) => {//---------6usuario
});

app.put("/api/abrigos/:id", async (req: Request, res: Response) => { //------3ABRIGOS-------
});

app.delete("/abrigos/:id", async (req: Request<{ id: string }>, res: Response) => {//-------5ABRIGO-----//
});

app.delete("/minha-conta/:id", async (req: Request<{ id: string }>, res: Response) => { //-----------7usuario
});

export default app;