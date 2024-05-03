export interface BillForm {
  totalAmount?: number;
  serviceRate?: number;
  gstRate?: number;
}

export type BillHandleType = "view" | "give";
