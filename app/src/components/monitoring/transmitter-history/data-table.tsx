import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
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
import Input from "@/components/form/input/InputField";
import { RefreshCw, Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/lib/ui/field";
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
import { useMemo, useState } from "react";
import {
  MonitoringKey,
  MonitoringResponse,
} from "@/api/geoserver/getMonitoring";
import { Button } from "@/components/lib/ui/button";
import { QueryObserverResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  option: {
    refetch: () => Promise<QueryObserverResult<MonitoringResponse, AxiosError>>;
    handleOnSubmit: HandleOnSubmit;
    isPending: boolean;
    isError: boolean;
  };
};

export type HandleOnSubmit = (val: MonitoringKey[1]) => void;

export function DataTable<TData, TValue>({
  columns,
  data = [],
  option: { refetch, handleOnSubmit, isPending, isError },
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const form = useForm<MonitoringKey[1]>({
    defaultValues: {
      search: "",
      by: "device_sn",
    },
  });

  const countLastPagination = useMemo(
    () =>
      Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        table.getRowCount(),
      ),
    [pagination, table],
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
          {/*<select
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>*/}
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
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex w-full justify-end"
        >
          <FieldGroup className="hidden flex-col gap-3 sm:flex sm:w-full sm:flex-row sm:justify-end sm:items-center">
            <Controller
              name="search"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  className="relative w-fit flex"
                  data-invalid={fieldState.invalid}
                >
                  <Input
                    {...field}
                    className="py-2.5 pr-4 pl-11"
                    id={field.name}
                    placeholder="Search..."
                    aria-invalid={fieldState.invalid}
                  />
                  <Search
                    className="absolute top-[50%] left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    width={20}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="by"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  className="w-fit"
                  data-invalid={fieldState.invalid}
                >
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px] !h-11"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="device_sn">Device SN</SelectItem>
                      <SelectItem value="device_id">Device IDs</SelectItem>
                      <SelectItem value="object_label">Mobile Label</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Failed to load data.
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}*/}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 p-4">
        {data.length > 0 ? (
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
            <span className="text-gray-800 dark:text-white/90">
              {" "}
              {table.getRowCount()}
            </span>
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
            {countLastPagination >= table.getRowCount() ? (
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
                  if (countLastPagination >= table.getRowCount()) {
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
