import express from "express";
import { buscarConFiltrosTr } from "../repositories/cliente/cliente-repositories.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Ruta de trabajadores");
});

router.get("/buscarCliente", async (req, res) => {
    const texto = req.query.texto;
    const estrellas = req.query.estrellas;
    const necesidad = req.query.necesidad;
    const distancia = req.query.distancia;
    const horario = req.query.horario;
    const precio = req.query.precio;
    const ubicacion = req.query.ubicacion;
    const tipo = req.query.tipo;

    const trabajadores = await buscarConFiltrosTr(texto, estrellas, necesidad, distancia, horario, precio, ubicacion, tipo);
    res.json(trabajadores);
});

export default router;