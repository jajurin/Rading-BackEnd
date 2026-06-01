import clienteRepository from "../repositories/cliente/cliente-repositories.js";

const repo = new clienteRepository();

export default class ClienteServices {

    registrarCliente = async (cliente) => {
        return await repo.registrarCliente(cliente);
    }

    buscarConFiltrosCl = async (
        texto,
        estrellas,
        especialidad,
        distancia,
        horario
    ) => {

        const trabajadoresFiltrados = await repo.filtrarTr(
            estrellas,
            especialidad,
            distancia,
            horario
        );

        const ids = trabajadoresFiltrados.map(t => t.id);

        return await repo.buscarTrabajador(texto, ids);
    }

    mostrarTrabajosActivos = async (idCliente) => {
        return await repo.mostrarTrabajosActivos(idCliente);
    }
    mostrarTodosLosClientes = async () => {
    return await repo.mostrarTodosLosClientes()
}
}