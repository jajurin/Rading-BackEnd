import express from "express";
import buscarTrabajador from "./repositories/cliente/cliente-repositories.js";

const app = express();

app.get('/buscar-trabajador', async (req, res) => {
    const texto = req.query.texto
    const trabajadores = await buscarTrabajador(texto)
    res.json(trabajadores)
})