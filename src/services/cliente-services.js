import clienteRepository from "../repositories/cliente/cliente-repositories.js"

export default class ClienteServices {
    buscarConFiltrosTr = async (texto, estrellas, especialidad, distancia, horario) => {
        const trabajadoresFiltrados = await clienteRepository.filtrarTr(estrellas, especialidad, distancia, horario)
        const ids = trabajadoresFiltrados.map(t => t.id)
        const resultado = await clienteRepository.buscarTrabajador(texto, ids)

        return resultado
    }

    mostrarTrabajosActivos = async (idCliente) => {
        const trabajosActivos = await clienteRepository.mostrarTrabajosActivos(idCliente)

        return trabajosActivos
    }
}