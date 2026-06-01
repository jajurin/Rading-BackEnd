import Usuario from './usuario.js';

class Trabajador extends Usuario {
    categoria;
    descripcion;
    zonaTrabajo;
    DispComienzo;
    DispFinal;
    foto;
    estrellas;

  constructor(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria, categoria, descripcion, zonaTrabajo, DispComienzo, DispFinal, foto) {
    super(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria)
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.zonaTrabajo = zonaTrabajo;
    this.DispComienzo = DispComienzo;
    this.DispFinal = DispFinal;
    this.foto = foto;
    this.estrellas = null;
  }
}

export default Trabajador
