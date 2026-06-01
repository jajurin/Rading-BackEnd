import { Router } from "express"
import ClienteServices from "../services/cliente-services.js";

const router = Router()
const svc = new ClienteServices()
router.get("/todos", async (req, res) => {
    try {
        const clientes = await svc.mostrarTodosLosClientes()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
    res.send("Ruta de clientes");
});
router.post("/registrar", async (req, res) => {
    try {
        await svc.registrarCliente(req.body);

        res.status(201).json({
            message: "Cliente registrado correctamente"
        });

    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/buscarTrabajador/texto=:texto&estrellas=:estrellas&especialidad=:especialidad&distancia=:distancia&horario=:horario", async (req, res) => {
    const texto = req.params.texto;
    const estrellas = req.params.estrellas;
    const especialidad = req.params.especialidad;
    const distancia = req.params.distancia;
    const horario = req.params.horario;

    const cliente = await svc.buscarConFiltrosCl(texto, estrellas, especialidad, distancia, horario);
    res.status(200).json(cliente);
});

router.get("/trabajosActivos/id=:id", async (req, res) => {
    const idCliente = req.params.id;

    const trabajosActivos = await svc.mostrarTrabajosActivos(idCliente);
    res.status(200).json(trabajosActivos);
});

export default router;