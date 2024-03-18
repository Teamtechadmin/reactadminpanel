export type UserRoles = "EVALUATOR";

export type EvaluatorsGetParams = {
  page: number;
  pageSize: number;
  role?: UserRoles;
};

export interface EvaluatorRootObject {
  status: string;
  message: string;
  data: Evaluator[];
  count: number;
  page: number;
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}

export interface Evaluator {
  _id?: string;
  id?: string;
  fullname?: string;
  userId?: string;
  isBlocked?: boolean;
  role?: string;
  email?: string;
  password?: string;
  originalPassword?: string;
  contactNo?: string;
  evaluatedCarId?: string[];
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type EvaluatorActionMode = "add" | "edit";
