import { Router } from "express";
import TrabajadorServices from "../repositories/trabajador/trabajador-repositories.js";
const router = Router();
const svc = new TrabajadorServices();

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

    const trabajadores = await svc.buscarConFiltrosTr(texto, estrellas, necesidad, distancia, horario, precio, ubicacion, tipo);
    res.status(200).json(trabajadores);
});

router.get("/trabajosRealizados", async (req, res) => {
    const idTrabajador = req.query.id;

    const trabajosRealizados = await svc.mostrarTrabajosRealizados(idTrabajador);
    res.status(200).json(trabajosRealizados);
});

export default router;