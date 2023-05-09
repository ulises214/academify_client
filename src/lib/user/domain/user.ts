export type User = {
  uCorreo: string;
  uNombre: string;
  uDependencia: string;
  uCuenta: string;
  uTipo: 'Estudiante' | 'Docente';
  cn: string;
  sn: string;
  displayName: string;
  ImmutableID: string;
  givenName: string;
  role: 'ADMIN' | 'STUDENT' | 'TEACHER';
};
