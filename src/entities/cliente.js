import Usuario from "./usuario.js";

class Cliente extends Usuario {
    estrellas;
    preferencias;

  constructor(nombre, apellido, email, direccion, contrasena, telefono, fechaNac, dni, cuentaBancaria, ubicacion, preferencias) {
    super(nombre, apellido, email, direccion, contrasena, telefono, fechaNac, dni, cuentaBancaria)
    this.estrellas = null;
    this.ubicacion = ubicacion;
    this.preferencias = preferencias;
  }
}

export default Cliente
