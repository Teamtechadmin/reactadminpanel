export interface AssignEvaluatorBody {
  status: "assign";
  evaluatorId: string;
  assignEvaluatorTime: string;
}

export interface AssignedResult {
  status: string;
  message: string;
  data: any[];
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}
