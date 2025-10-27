type GeoJsonCoordinates = [number, number];

interface GeoJsonPointGeometry {
  type: 'Point'; 
  coordinates: GeoJsonCoordinates;
}

export interface GeoJsonProperties {
  app_active: string;
  app_name: string;
  company_address: string;
  company_contact_person: string;
  company_name: string;
  company_npwp: string;
  company_siup: string | null;
  current_port_id: number | null;
  current_port_name: string | null;
  current_wpp_id: number;
  current_wpp_name: string;
  customer_id: number;
  customer_type_id: number;
  customer_type_name: string;
  device_active: string;
  device_atp_end: string; // Tipe ISO 8601 string
  device_atp_start: string; // Tipe ISO 8601 string
  device_created_by: number;
  device_first_active: string; // Tipe ISO 8601 string
  device_id: number;
  device_ids: string;
  device_imei: string;
  device_interval: number;
  device_ip: string | null;
  device_password: string | null;
  device_sn: string;
  device_ssid: string | null;
  device_status: string;
  device_type_name: string;
  device_type_provider: string;
  device_updated_by: number | null;
  device_username: string | null;
  object_category_id: number;
  object_category_name: string;
  object_created_at: string; // Tipe ISO 8601 string
  object_created_by: number;
  object_gross_ton: number;
  object_id: number;
  object_label: string;
  object_state: string;
  object_type_id: number;
  object_type_name: string;
  object_updated_at: string; // Tipe ISO 8601 string
  object_updated_by: number | null;
  owner_id: number | null;
  transmitter_active: string;
  transmitter_created_by: number;
  transmitter_heading: string; // Berisi angka dalam bentuk string "0"
  transmitter_id: number;
  transmitter_latitude: number;
  transmitter_longitude: number;
  transmitter_pingtime: string; // Tipe ISO 8601 string
  transmitter_speed: string; // Berisi angka dalam bentuk string "0"
  transmitter_status: string;
  transmitter_type_id: number;
  transmitter_type_name: string;
  transmitter_updated_at: string; // Tipe ISO 8601 string
  transmitter_updated_by: number | null;
  transmitter_url_api: string | null;
}

export interface GeoJsonFeature {
  type: 'Feature';
  id: string;
  bbox: [number, number, number, number];
  geometry_name: string;
  geometry: GeoJsonPointGeometry;
  properties: GeoJsonProperties;
}

interface GeoJsonCRS {
  type: 'name';
  properties: {
    name: 'urn:ogc:def:crs:EPSG::4326';
  };
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection'; 
  bbox: [number, number, number, number];
  crs: GeoJsonCRS;
  features: GeoJsonFeature[];
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;   
  totalFeatures: number;
}