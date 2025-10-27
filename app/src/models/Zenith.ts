interface PositionCrsProperties {
  name: "EPSG:4326";
}

interface PositionCrs {
  type: "name";
  properties: PositionCrsProperties;
}

interface Position {
  crs: PositionCrs;
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export type Zenith = {
  id: number;
  deviceid: string;
  msgtimestamp: string; // Or Date, depending on how you process it
  createdAt: string; // Or Date, depending on how you process it
  long: number;
  lat: number;
  speed: number;
  heading: number;
  counter: string;
  temper: string;
  sended: number;
  temper_flag: number;
  rpm1: number;
  rpm2: number;
  wind_speed: number;
  temperature: number;
  fuel: number;
  humidity: number;
  dc_supply1: number | null;
  dc_supply2: number | null;
  psu_out: number | null;
  battery: number | null;
  is_wifi: boolean | null; 
  position: Position;
}