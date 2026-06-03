import config from '../../configs/dbconfig.js'
import pkg from 'pg'
const { Client } = pkg

export default class trabajadorRepository {

    buscarCliente = async (texto, ids = []) => {
        const client = new Client(config)
        let result

        try {
            await client.connect()

            let sql = `
                SELECT *
                FROM Cliente
                WHERE (
                    nombre ILIKE $1
                    OR apellido ILIKE $1
                )
            `

            const values = [`%${texto}%`]

            if (ids.length > 0) {
                sql += ` AND id = ANY($2)`
                values.push(ids)
            }

            result = await client.query(sql, values)

        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }

    filtrarCl = async (estrellas, necesidad, distancia, horario, precio, ubicacion, tipo) => {
        const client = new Client(config)
        let result

        try {
            await client.connect()

            const sql = `
                SELECT Cliente.id
                FROM "Trabajador-Cliente"
                INNER JOIN Cliente
                    ON "Trabajador-Cliente".id_cliente = Cliente.id
                WHERE Cliente.estrellas >= $1
                AND "Trabajador-Cliente".necesidad = $2
                AND "Trabajador-Cliente".distancia <= $3
                AND "Trabajador-Cliente".horario = $4
                AND "Trabajador-Cliente".precio = $5
                AND Cliente.ubicacion = $6
                AND "Trabajador-Cliente".tipo = $7
            `

            const values = [
                estrellas,
                necesidad,
                distancia,
                horario,
                precio,
                ubicacion,
                tipo
            ]

            result = await client.query(sql, values)

        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }

    mostrarTrabajosRealizados = async (idTrabajador) => {
        const client = new Client(config)
        let result

        try {
            await client.connect()

            const sql = `
                SELECT
                    Cliente.nombre,
                    Cliente.apellido,
                    "Trabajador-Cliente".precio,
                    "Trabajador-Cliente".necesidad,
                    "Trabajador-Cliente".fecha_iniciado,
                    "Trabajador-Cliente".fecha_acabado,
                    "Trabajador-Cliente".estado
                FROM Trabajador
                INNER JOIN "Trabajador-Cliente"
                    ON "Trabajador-Cliente".id_trabajador = Trabajador.id
                INNER JOIN Cliente
                    ON "Trabajador-Cliente".id_cliente = Cliente.id
                WHERE Trabajador.id = $1
                AND "Trabajador-Cliente".estado IN ('TERMINADO', 'CANCELADO')
            `

            result = await client.query(sql, [idTrabajador])

        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }

    registrarTrabajador = async (trabajador) => {
        const client = new Client(config)

        try {
            await client.connect()

           const sqlUsuario = `
    INSERT INTO "Usuario"
    (
        nombre,
        apellido,
        email,
        direccion,
        contrasena,
        telefono,
        "fechaNac",
        "dni",
        "cuentaBancaria"
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
`

            const resultUsuario = await client.query(
                sqlUsuario,
                [
                    trabajador.nombre,
                    trabajador.apellido,
                    trabajador.email,
                    trabajador.direccion,
                    trabajador.contrasena,
                    trabajador.telefono,
                    trabajador.fechaNac,
                    trabajador.dni,
                    trabajador.cuentaBancaria
                ]
            )

            const idUsuario = resultUsuario.rows[0].id

           const sqlTrabajador = `
    INSERT INTO "Trabajador"
    (
        "idPersona",
        categoria,
        descripcion,
        "zonaTrabajo",
        "DispComienzo",
        "DispFinal",
        foto,
        estrellas
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
`
            await client.query(
                sqlTrabajador,
                [
                    idUsuario,
                    trabajador.categoria,
                    trabajador.descripcion,
                    trabajador.zonaTrabajo,
                    trabajador.DispComienzo,
                    trabajador.DispFinal,
                    trabajador.foto,
                    0
                ]
            )

            return {
                success: true,
                idUsuario
            }

        } catch (err) {
            console.error(err)
            throw err
        } finally {
            await client.end()
        }
    }
}