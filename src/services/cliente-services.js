import { filtrar, buscarTrabajador } from '../repositories/trabajador-repository.js'

async function buscarConFiltros(texto, estrellas, especialidad, distancia, horario) {
    const trabajadoresFiltrados = await filtrar(estrellas, especialidad, distancia, horario)
    const ids = trabajadoresFiltrados.map(t => t.id)
    const resultado = await buscarTrabajador(texto, ids)

    return resultado
}

export { buscarConFiltros }