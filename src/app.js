import express from 'express'
import { crearUsuario, FechaCompleta } from './usuario.js'

export const app = express()

app.get('/', (req, res) => {
  res.send('Bienvenido a Rading')
})

app.post('/usuario', (req, res) => {
  const usuario = crearUsuario(req.body)
  res.send(usuario)
})

app.use('', (req, res) => {
  res.status(404).send('Página no encontrada')
})