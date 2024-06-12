export interface EvaluatorObject {
  status: string;
  message: string;
  data: EvaluatorData[];
  meta: Meta;
  count?: number;
}

interface Meta {
  access: string;
  refresh: string;
}

export interface EvaluatorData {
  _id: string;
  fullname: string;
  userId: string;
  email: string;
  contactNo: number;
  location: string;
  pendingEvaluatedCars: number;
  completeEvaluatedCars: number;
}
