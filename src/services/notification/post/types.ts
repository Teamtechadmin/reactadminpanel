export interface FCMBody {
  fcmToken: string | null;
  platform: "WEB";
}

export interface FCMResponse {
  status: string;
  message: string;
  data: Datum[];
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}

interface Datum {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}
