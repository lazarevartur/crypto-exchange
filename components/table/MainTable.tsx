"use client";
import * as React from "react";
import {
  Box,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  isLoading?: boolean;
  clickHandler?: () => void;
  rowFullWidth?: boolean;
};

export function MainTable<Data extends object>({
  data,
  columns,
  isLoading = false,
  clickHandler,
  rowFullWidth = false,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <TableContainer suppressHydrationWarning>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {/*<chakra.span pl="4">*/}
                    {/*  {header.column.getIsSorted() ? (*/}
                    {/*    header.column.getIsSorted() === 'desc' ? (*/}
                    {/*      'Down'*/}
                    {/*    ) : (*/}
                    {/*      'Top'*/}
                    {/*    )*/}
                    {/*  ) : null}*/}
                    {/*</chakra.span>*/}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <Td key={colIndex}>
                      <Skeleton borderRadius={20} height="45px" />
                    </Td>
                  ))}
                </Tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <Tr
                  onClick={() => (clickHandler ? clickHandler() : null)}
                  cursor={clickHandler ? "pointer" : "default"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta: any = cell.column.columnDef.meta;
                    return (
                      <Td
                        w={rowFullWidth ? "100%" : "auto"}
                        key={cell.id}
                        isNumeric={meta?.isNumeric}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
