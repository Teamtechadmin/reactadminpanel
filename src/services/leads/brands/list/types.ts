export interface BrandsObject {
  results: Result[];
  popular: Result[];
  is_success: boolean;
  status_code: number;
}

export interface Result {
  id: number;
  display_name: string;
  is_procurable: boolean;
  is_usable: boolean;
  logo_url: string;
  tags: string[];
  logo_with_name: string;
}
