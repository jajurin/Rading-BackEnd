import { Router } from "express"
import TrabajadorServices from "../services/trabajador-services.js"

const router = Router()
const svc = new TrabajadorServices()
router.get("/", async (req, res) => {
    res.send("Ruta de trabajadores");
});
router.post("/registrar", async (req, res) => {
    try {

        await svc.registrarTrabajador(req.body);

        res.status(201).json({
            message: "Trabajador registrado correctamente"
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/buscarCliente/texto=:texto&estrellas=:estrellas&necesidad=:necesidad&distancia=:distancia&horario=:horario&precio=:precio&ubicacion=:ubicacion&tipo=:tipo", async (req, res) => {
    const texto = req.params.texto;
    const estrellas = req.params.estrellas;
    const necesidad = req.params.necesidad;
    const distancia = req.params.distancia;
    const horario = req.params.horario;
    const precio = req.params.precio;
    const ubicacion = req.params.ubicacion;
    const tipo = req.params.tipo;

    const trabajadores = await svc.buscarConFiltrosTr(texto, estrellas, necesidad, distancia, horario, precio, ubicacion, tipo);
    res.status(200).json(trabajadores);
});

router.get("/trabajosRealizados/:id", async (req, res) => {
    const idTrabajador = req.params.id;

    const trabajosRealizados = await svc.mostrarTrabajosRealizados(idTrabajador);
    res.status(200).json(trabajosRealizados);
});

export default router;