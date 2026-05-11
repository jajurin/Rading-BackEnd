import express from 'express'
import { crearUsuario } from './usuario.js'

export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bienvenido a Rading')
})

app.post('/usuario', (req, res) => {
  try {
    const usuario = crearUsuario(req.body)
    res.send(usuario)
  } catch (error) {
    res.status(500).send({ error: 'Error al crear el usuario' })
  }
})

app.use('', (req, res) => {
  res.status(404).send('Página no encontrada')
})