import config from '../../configs/dbconfig'
import pkg from 'pg'
const { Client } = pkg

async function buscarTrabajador(texto, ids = []) {
    const client = new Client(config)
    await client.connect()

    let sql = `
        SELECT *
        FROM Trabajador
        WHERE (
            nombre ILIKE $1
            OR apellido ILIKE $1
        )`
    
    const values = [`%${texto}%`]

    if (ids.length > 0) {
        sql += ` AND id = ANY($2)`
        values.push(ids)
    }

    const result = await client.query(sql, values)            
    await client.end()

    return result.rows
}

async function filtrar(estrellas, especialidad, distancia, horario) {
    const client = new Client(config)
    await client.connect()

    let sql = `SELECT Trabajador.id
        FROM Trabajador-Cliente
        INNER JOIN Trabajador 
        ON Trabajador-Cliente.id_trabajador = Trabajador.id
        WHERE Trabajador.estrellas >= $1
        AND Trabajador.especialidad = $2
        AND Trabajador-Cliente.distancia <= $3
        AND Trabajador.horario = $4`

    const values = [estrellas, especialidad, distancia, horario]
    const result = await client.query(sql, values)
    await client.end()

    return result.rows
}

export { buscarTrabajador, filtrar }