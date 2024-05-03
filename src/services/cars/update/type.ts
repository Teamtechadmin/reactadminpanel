export interface UpdateCarProps {
  id: string;
  body: UpdateCarDataBody;
}

export interface UpdateCarDataBody {
  _id?: string;
  qcStatus?: string;
  status?: string;
  bidStartTime?: Date;
  bidEndTime?: Date;
  startBidTime?: Date;
  endBidTime?: Date;
  realValue?: string;
}
