import express from "express";
import { buscarConFiltrosCl } from "../repositories/trabajador/trabajador-repository.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Ruta de clientes");
});

router.get("/buscarTrabajador", async (req, res) => {
    const texto = req.query.texto;
    const estrellas = req.query.estrellas;
    const especialidad = req.query.especialidad;
    const distancia = req.query.distancia;
    const horario = req.query.horario;

    const cliente = await buscarConFiltrosCl(texto, estrellas, especialidad, distancia, horario);
    res.json(cliente);
});

export default router;