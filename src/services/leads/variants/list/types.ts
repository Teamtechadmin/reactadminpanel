export interface VariantObject {
  count: number;
  next: null;
  previous: null;
  results: Result[];
  is_success: boolean;
  status_code: number;
}

export interface Result {
  id: number;
  name: string;
  display_name: string;
  full_name: string;
  description: string;
  launch_year: number;
  discontinued_year: number;
  ownership_cost: null;
  specifications_id: null;
  specs_added: boolean;
  is_verified: boolean;
  is_public: boolean;
  is_usable: boolean;
  is_valid: boolean;
  pricing_name: null;
  model: number;
  is_active: boolean;
  crawler: null;
  transmission_type: string;
  fuel_type: string;
  variant_rank: null;
  tags: any[];
  color: any[];
  image: Image[];
  attributes: Attribute[];
}

interface Attribute {
  display_name: string;
  attribute_id: string;
  value: number;
}

interface Image {
  primary_image_url: null;
  secondary_image_url: null;
  primary_image_description: null;
  secondary_image_description: null;
}
