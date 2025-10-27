import { ColumnDef } from "@tanstack/react-table";
import { Zenith } from "@/models/Zenith";

export const columns: ColumnDef<Zenith>[] = [
  {
    accessorKey: "id",
    header: "ID Data",
  },
  {
    accessorKey: "deviceid",
    header: "ID Perangkat",
  },
  {
    accessorKey: "msgtimestamp",
    header: "Transmitter Pingtime",
    cell: ({ row }) => {
      const timestamp = row.getValue("msgtimestamp") as number;
      return <>{new Date(timestamp).toLocaleString()}</>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const timestamp = row.getValue("createdAt") as number;
      return <>{new Date(timestamp).toLocaleString()}</>;
    },
  },
  {
    accessorKey: "lat",
    header: "Latitude",
  },
  {
    accessorKey: "long",
    header: "Longitude",
  },
  {
    accessorKey: "speed",
    header: "Speed (km/jam)",
  },
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "rpm1", // Mengambil RPM2 karena RPM1 = 0
    header: "RPM 1",
  },
  {
    accessorKey: "rpm2", // Mengambil RPM2 karena RPM1 = 0
    header: "RPM 2",
  },
  {
    accessorKey: "temperature",
    header: "temperature",
  },
  {
    accessorKey: "humidity",
    header: "humidity",
  },
  {
    accessorKey: "fuel",
    header: "fuel",
  },
  {
    accessorKey: "wind_speed",
    header: "Wind Speed",
  },
  {
    accessorKey: "battery",
    header: "Battery",
  },
  {
    accessorKey: "dc_supply1",
    header: "DC Supply 1",
  },
  {
    accessorKey: "dc_supply2",
    header: "DC Supply 2",
  },
  {
    accessorKey: "psu_out",
    header: "PSU Out",
  },
  {
    accessorKey: "temper",
    header: "Temper",
  },
  {
    accessorKey: "temper_flag",
    header: "Temper Flag",
  },
  {
    accessorKey: "is_wifi",
    header: "Is Using Wifi",
  }
];
