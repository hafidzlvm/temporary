import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/lib/ui/table";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/lib/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/lib/ui/pagination";
import { Dispatch, SetStateAction, useMemo } from "react";
import { LogZenithKey, LogZenithResponse } from "@/api/zenith/getLogZenith";
import { Button } from "@/components/lib/ui/button";
import { QueryObserverResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  option: {
    refetch: () => Promise<QueryObserverResult<LogZenithResponse, AxiosError>>;
    handleOnSubmit?: HandleOnSubmit;
    isPending: boolean;
    isError: boolean;
    pagination: PaginationState;
    setPagination: (updater: Updater<PaginationState>) => void;
    sort: "ASC" | "DESC";
    setSort: Dispatch<SetStateAction<"ASC" | "DESC">>;
  };
};

export type HandleOnSubmit = (val: LogZenithKey[2]) => void;

export function DataTable<TData, TValue>({
  columns,
  data = [],
  total,
  option: {
    refetch,
    isPending,
    isError,
    pagination,
    setPagination,
    sort,
    setSort,
  },
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: total,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  const countLastPagination = useMemo(
    () => Math.min((pagination.pageIndex + 1) * pagination.pageSize, total),
    [pagination, total],
  );

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="p-4 flex justify-between">
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Mobile History
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your most recent Mobile History
          </p>
        </div>
      </div>
      <div className="p-4 flex border-t !border-gray-100 dark:!border-white/[0.05]">
        <div className="flex w-full me-auto items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <span>Show</span>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              id="form-rhf-select-language"
              className="w-fit !h-11"
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent position="popper">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  onClick={() => setPagination({ ...pagination, pageSize })}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>
        <Select
          value={sort}
          onValueChange={(value: "ASC" | "DESC") => {
            setSort(value);
          }}
        >
          <SelectTrigger
            id="form-rhf-select-language"
            className="min-w-[120px] !h-11"
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="ASC">Ascending</SelectItem>
            <SelectItem value="DESC">Descending</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="ml-3 h-11 w-fit"
          size="sm"
          onClick={() => {
            refetch();
          }}
        >
          <RefreshCw className={isPending ? "animate-spin" : ""} />
        </Button>
      </div>
      <Table className="border-t !border-gray-100 dark:!border-white/[0.05]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={total} className="h-24 text-center">
                Loading data...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={total} className="h-24 text-center">
                Failed to load data.
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={total} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {/*{table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={total} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}*/}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 p-4">
        {total > 0 ? (
          <p className="block w-full text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="text-gray-800 dark:text-white/90">
              {pagination.pageIndex * pagination.pageSize + 1}{" "}
            </span>
            to{" "}
            <span className="text-gray-800 dark:text-white/90">
              {countLastPagination}{" "}
            </span>
            of{" "}
            <span className="text-gray-800 dark:text-white/90"> {total}</span>
          </p>
        ) : (
          <></>
        )}

        <Pagination className="!justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                aria-disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {pagination.pageIndex == 0 ? (
              <></>
            ) : (
              <PaginationItem
                onClick={() => {
                  table.setPageIndex(pagination.pageIndex - 1);
                }}
              >
                <PaginationLink>{pagination.pageIndex}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>
                {data.length > 0 ? pagination.pageIndex + 1 : ""}
              </PaginationLink>
            </PaginationItem>
            {countLastPagination >= total ? (
              <></>
            ) : (
              <PaginationItem
                onClick={() => {
                  table.setPageIndex(pagination.pageIndex + 2);
                }}
              >
                <PaginationLink>{pagination.pageIndex + 2}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (countLastPagination >= total) {
                    return;
                  }
                  table.nextPage();
                }}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
