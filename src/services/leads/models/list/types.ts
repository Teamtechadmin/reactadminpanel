export interface ModelObject {
  count: number;
  next: null;
  previous: null;
  results: Result[];
  popular: Popular[];
  is_success: boolean;
  status_code: number;
}

export interface Popular {
  id: number;
  name: string;
  display_name: string;
  full_name: string;
  is_active: boolean;
  is_public: boolean;
  is_procurable: boolean;
  is_usable: boolean;
  body_type: string;
  segment_type: string;
  overview: string;
  shelf_life: number;
  model_category: null;
  make: number;
  generation: null;
  generation_start_month: null;
  generation_start_year: null;
  generation_end_month: null;
  generation_end_year: null;
  facelift: boolean;
  related_models: number[];
  parent_model: null;
  tags: string[];
  colors: number[];
  category: number[];
  media: any[];
  logo: string;
}

export interface Result {
  id: number;
  name: string;
  display_name: string;
  is_usable: boolean;
  logo: string;
}
