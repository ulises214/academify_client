import { BaseModel } from '../../common/domain/models/base-model';

export type UserRole = 'ADMIN' | 'STUDENT' | 'TEACHER';
export type LoginUser = {
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
  role: UserRole;
};

export type User = BaseModel & {
  role: UserRole;
  email: string;
  name: string;
};
