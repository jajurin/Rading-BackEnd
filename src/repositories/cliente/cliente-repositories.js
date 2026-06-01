import config from '../../configs/dbconfig'
import pkg from 'pg'
const { Client } = pkg

export default class clienteRepository {

    buscarTrabajador = async (texto, ids = []) => {
        const client = new Client(config)
        try {
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
        } catch (err) {
            console.error(err)
        }

        return result.rows
    }

    filtrarTr = async (estrellas, especialidad, distancia, horario) => {
        const client = new Client(config)
        
        try {
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
        } catch (err) {
            console.error(err)
        }

        return result.rows
    }

    mostrarTrabajosActivos = async (idCliente) => {
        const client = new Client(config)
        
        try {
            await client.connect()

            let sql = `SELECT Trabajador.nombre, Trabajador.apellido, Trabajador-Cliente.precio, Trabajador-Cliente.necesidad, Trabajador-Cliente.fecha_iniciado, Trabajador-Cliente.estado
                FROM Cliente
                INNER JOIN Trabajador-Cliente 
                ON Trabajador-Cliente.id_cliente = Cliente.id
                INNER JOIN Trabajador 
                ON Trabajador-Cliente.id_trabajador = Trabajador.id
                WHERE Cliente.id = $1
                AND Trabajador-Cliente.estado IN ('EN PROCESO')`                   

            const result = await client.query(sql, [idCliente])
            await client.end()
        } catch (err) {
            console.error(err)
        }

        return result.rows
    }
}