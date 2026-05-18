import { filtrarTr, buscarTrabajador } from '../repositories/trabajador-repository.js'

async function buscarConFiltrosTr(texto, estrellas, especialidad, distancia, horario) {
    const trabajadoresFiltrados = await filtrarTr(estrellas, especialidad, distancia, horario)
    const ids = trabajadoresFiltrados.map(t => t.id)
    const resultado = await buscarTrabajador(texto, ids)

    return resultado
}

async function mostrarTrAct(idCliente){
    const trabajosRealizados = await mostrarTrabajosActivos(idCliente)

    return trabajosRealizados
}


export { buscarConFiltrosTr, mostrarTrAct }