import Usuario from "./usuario.js";

class Cliente extends Usuario {
    estrellas;
    ubicacion;
    preferencias;

  constructor(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria, ubicacion, preferencias) {
    super(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria)
    this.estrellas = null;
    this.ubicacion = ubicacion;
    this.preferencias = preferencias;
  }
}

export default Cliente
