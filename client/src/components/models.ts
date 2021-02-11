export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface RegistrationForm {
  email: string;
  password: string;
  passwordConf: string;
}