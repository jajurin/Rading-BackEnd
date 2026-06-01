class Usuario {
  id;
  nombre;
  apellido;
  email;
  direccion;
  contrasena;
  telefono;
  fechaNac;
  dni;


  constructor(nombre, apellido, email, direccion, contrasena, telefono, fechaNac, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.direccion = direccion;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.fechaNac = fechaNac;
    this.dni = dni;
  }
}

export default Usuario

