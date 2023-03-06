export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  active?: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active?: boolean;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
