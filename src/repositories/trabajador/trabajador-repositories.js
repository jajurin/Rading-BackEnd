import config from '../../configs/dbconfig'
import pkg from 'pg'
const { Client } = pkg

export default class trabajadorRepository {
    buscarCliente = async (texto, ids = []) => {
        const client = new Client(config)
        
        try {
            await client.connect()

            let sql = `
                SELECT *
                FROM Cliente
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

    filtrarCl = async (estrellas, necesidad, distancia, horario, precio, ubicacion, tipo) => {
        const client = new Client(config)
        
        try {
            await client.connect()

            let sql = `SELECT Cliente.id
                FROM Trabajador-Cliente
                INNER JOIN Cliente 
                ON Trabajador-Cliente.id_cliente = Cliente.id
                WHERE Cliente.estrellas >= $1
                AND Trabajador-Cliente.necesidad = $2
                AND Trabajador-Cliente.distancia <= $3
                AND Trabajador-Cliente.horario = $4
                AND Trabajador-Cliente.precio = $5
                AND Cliente.Ubicacion = $6
                AND Trabajador-Cliente.tipo = $7`                    

            const values = [estrellas, necesidad, distancia, horario, precio, ubicacion, tipo]
            const result = await client.query(sql, values)
            await client.end()
        } catch (err) {
            console.error(err)
        }

        return result.rows
    }

    mostrarTrabajosRealizados = async (idTrabajador) => {
        const client = new Client(config)
        
        try {
            await client.connect()

            let sql = `SELECT Cliente.nombre, Cliente.apellido, Trabajador-Cliente.precio, Trabajador-Cliente.necesidad, Trabajador-Cliente.fecha_iniciado, Trabajador-Cliente.fecha_acabado, Trabajador-Cliente.estado
                FROM Trabajador
                INNER JOIN Trabajador-Cliente 
                ON Trabajador-Cliente.id_trabajador = Trabajador.id
                INNER JOIN Cliente 
                ON Trabajador-Cliente.id_cliente = Cliente.id
                WHERE Trabajador.id = $1
                AND Trabajador-Cliente.estado IN ('TERMINADO', 'CANCELADO')`                   

            const result = await client.query(sql, [idTrabajador])
            await client.end()
        } catch (err) {
            console.error(err)
        }

        return result.rows
    }
}