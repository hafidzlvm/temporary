import { GeoJsonFeature } from "@/models/Geoserver";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/lib/ui/dropdown-menu";
import { Button } from "@/components/lib/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

export const columns: ColumnDef<GeoJsonFeature>[] = [
  {
    accessorKey: "object_label",
    header: "Mobile Name",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium text-gray-700 dark:text-gray-400">
          {row.original.properties.object_label}
        </div>
      );
    },
  },
  {
    accessorKey: "device_ids",
    header: "Device IDs",
    cell: ({ row }) => {
      return row.original.properties.device_ids
    },
  },
  {
    accessorKey: "device_sn",
    header: "Device SN",
    cell: ({ row }) => {
      return row.original.properties.device_sn
    },
  },
  {
    accessorKey: "transmitter_pingtime",
    header: "Last Update",
    cell: ({ row }) => {
      return row.original.properties.transmitter_pingtime    
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.properties.device_sn)}
            >
              Copy device SN
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/transmitter-history/${data.properties.device_sn}`}>Detail</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
