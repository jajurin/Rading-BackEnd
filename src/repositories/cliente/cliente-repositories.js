import config from '../../configs/dbconfig.js'
import pkg from 'pg'
const { Client } = pkg

export default class clienteRepository {

    buscarTrabajador = async (texto, ids = []) => {
        const client = new Client(config)
        let result

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

            result = await client.query(sql, values)
        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }

    filtrarTr = async (estrellas, especialidad, distancia, horario) => {
        const client = new Client(config)
        let result

        try {
            await client.connect()

            let sql = `SELECT Trabajador.id
                FROM "Trabajador-Cliente"
                INNER JOIN Trabajador 
                ON "Trabajador-Cliente".id_trabajador = Trabajador.id
                WHERE Trabajador.estrellas >= $1
                AND Trabajador.especialidad = $2
                AND "Trabajador-Cliente".distancia <= $3
                AND Trabajador.horario = $4`

            const values = [estrellas, especialidad, distancia, horario]
            result = await client.query(sql, values)
        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }

    mostrarTrabajosActivos = async (idCliente) => {
        const client = new Client(config)
        let result

        try {
            await client.connect()

            let sql = `SELECT Trabajador.nombre, Trabajador.apellido, "Trabajador-Cliente".precio, "Trabajador-Cliente".necesidad, "Trabajador-Cliente".fecha_iniciado, "Trabajador-Cliente".estado
                FROM Cliente
                INNER JOIN "Trabajador-Cliente" 
                ON "Trabajador-Cliente".id_cliente = Cliente.id
                INNER JOIN Trabajador 
                ON "Trabajador-Cliente".id_trabajador = Trabajador.id
                WHERE Cliente.id = $1
                AND "Trabajador-Cliente".estado IN ('EN PROCESO')`                   

            result = await client.query(sql, [idCliente])
        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }

        return result?.rows ?? []
    }
    registrarCliente = async (cliente) => {
    const client = new Client(config);

    try {
        await client.connect();

        const sqlUsuario = `
            INSERT INTO Usuario
            (
                nombre,
                apellido,
                email,
                direccion,
                contrasena,
                telefono,
                fechaNac,
                dni,
                cuentaBancaria
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
        `;

        const resultUsuario = await client.query(
            sqlUsuario,
            [
                cliente.nombre,
                cliente.apellido,
                cliente.email,
                cliente.direccion,
                cliente.contrasena,
                cliente.telefono,
                cliente.fechaNac,
                cliente.dni,
                cliente.cuentaBancaria
            ]
        );

        const idUsuario = resultUsuario.rows[0].id;

        const sqlCliente = `
            INSERT INTO Cliente
            (
                idPersona,
                preferencias,
                estrellas
            )
            VALUES ($1,$2,$3)
        `;

        await client.query(
            sqlCliente,
            [
                idUsuario,
                cliente.preferencias,
                0
            ]
        );

        await client.end();

    } catch (err) {
        console.error(err);
    }
}
mostrarTodosLosClientes = async () => {
    const client = new Client(config)
    let result

    try {
        await client.connect()

        const sql = `
            SELECT *
            FROM Cliente
        `

        result = await client.query(sql)

    } catch (err) {
        console.error(err)
    } finally {
        await client.end()
    }

    return result?.rows ?? []
}
}