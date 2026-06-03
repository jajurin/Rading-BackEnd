import trabajadorRepository from "../repositories/trabajador/trabajador-repositories.js";

const repo = new trabajadorRepository();

export default class TrabajadorServices {

   registrarTrabajador = async (trabajador) => {
    return await repo.registrarTrabajador(trabajador);
}

    buscarConFiltrosTr = async (
        texto,
        estrellas,
        necesidad,
        distancia,
        horario,
        precio,
        ubicacion,
        tipo
    ) => {
        const clientesFiltrados = await repo.filtrarCl(
            estrellas,
            necesidad,
            distancia,
            horario,
            precio,
            ubicacion,
            tipo
        );

        const ids = clientesFiltrados.map(t => t.id);

        return await repo.buscarCliente(texto, ids);
    }

    mostrarTrabajosRealizados = async (idTrabajador) => {
        return await repo.mostrarTrabajosRealizados(idTrabajador);
    }
}