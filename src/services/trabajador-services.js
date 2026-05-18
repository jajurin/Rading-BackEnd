import { filtrarCl, buscarCliente, mostrarTrabajosRealizados } from '../repositories/trabajador-repository.js'

async function buscarConFiltrosCl(texto, estrellas, necesidad, distancia, horario, precio, ubicacion, tipo) {
    const clientesFiltrados = await filtrarCl(estrellas, necesidad, distancia, horario, precio, ubicacion, tipo)
    const ids = clientesFiltrados.map(t => t.id)
    const resultado = await buscarCliente(texto, ids)

    return resultado
}

async function mostrarTrRea(idTrabajador){
    const trabajosRealizados = await mostrarTrabajosRealizados(idTrabajador)

    return trabajosRealizados
}

export { buscarConFiltrosCl, mostrarTrRea }