class Cliente {
    estrellas;
    ubicacion;
    preferencias;

  constructor(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria, ubicacion, preferencias) {
    super(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria)
    this.estrellas = null;
    this.ubicacion = ubicacion;
    this.preferencias = preferencias    ;
  }
}

export default Cliente
