import { LoginData } from "@/services/auth/types";

export const defaultLogin: { user: LoginData } = {
  user: {
    role: "",
    _id: "",
    createdAt: "",
    email: "",
    fullname: "",
    isBlocked: false,
    updatedAt: "",
    userId: "",
  },
};
