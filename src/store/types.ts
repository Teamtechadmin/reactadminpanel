export interface UserType {
  role: string;
}

export interface AuthType {
  loading: boolean;
  user: UserType;
}
