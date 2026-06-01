import { Router } from "express";
import ClienteServices from "../repositories/trabajador/trabajador-repository.js";
const router = Router();
const svc = new ClienteServices();

router.get("/", async (req, res) => {
    res.send("Ruta de clientes");
});

router.get("/buscarTrabajador", async (req, res) => {
    const texto = req.query.texto;
    const estrellas = req.query.estrellas;
    const especialidad = req.query.especialidad;
    const distancia = req.query.distancia;
    const horario = req.query.horario;

    const cliente = await svc.buscarConFiltrosCl(texto, estrellas, especialidad, distancia, horario);
    res.status(200).json(cliente);
});

router.get("/trabajosActivos", async (req, res) => {
    const idCliente = req.query.id;

    const trabajosActivos = await svc.mostrarTrabajosActivos(idCliente);
    res.status(200).json(trabajosActivos);
});

export default router;