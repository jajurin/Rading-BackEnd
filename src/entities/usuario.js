class Usuario {
  id;
  nombre;
  apellido;
  email;
  contrasena;
  nroTelefono;
  fechaNac;
  dni;
  cuentaBancaria;

  constructor(nombre, apellido, email, contrasena, nroTelefono, fechaNac, dni, cuentaBancaria) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.contrasena = contrasena;
    this.nroTelefono = nroTelefono;
    this.fechaNac = fechaNac;
    this.dni = dni;
    this.cuentaBancaria = cuentaBancaria
  }
}

export default Usuario

