import trabajadorRepository from '../repositories/trabajador-repository.js'

export default class TrabajadorServices {
    buscarConFiltrosCl = async (texto, estrellas, necesidad, distancia, horario, precio, ubicacion, tipo) => {
        const clientesFiltrados = await trabajadorRepository.filtrarCl(estrellas, necesidad, distancia, horario, precio, ubicacion, tipo)
        const ids = clientesFiltrados.map(t => t.id)
        const resultado = await trabajadorRepository.buscarCliente(texto, ids)

        return resultado
    }

    mostrarTrabajosRealizados = async (idTrabajador) => {
        const trabajosRealizados = await trabajadorRepository.mostrarTrabajosRealizados(idTrabajador)

        return trabajosRealizados
    }
}