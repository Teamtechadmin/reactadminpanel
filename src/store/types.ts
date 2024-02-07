import { LoginData } from "@/services/auth/types";

export interface AuthType {
  loading: boolean;
  user: LoginData;
}
