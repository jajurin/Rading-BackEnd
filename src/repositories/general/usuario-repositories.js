import config from '../../configs/dbconfig'
import pkg from 'pg'
const { Client } = pkg

async function registrarse() {
    const client = new Client(config)
    await client.connect()

    let sql = 'INSERT INTO Usuario (nombre, apellido, dni, email, contraseña, telefono, fechaNac) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    const values = [nombre, apellido, dni, email, contraseña, telefono, fechaNac]
    const result = await client.query(sql, values)
    await client.end()

    console.log(result.rows[0])
}

export default registrarse

