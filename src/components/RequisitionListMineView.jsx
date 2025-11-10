import { Link } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'

import { useRequisitionsMine } from '../hooks/requisitions'
import { requisitionDetailRoute } from '../router'
import { formatAmount, formatDate, formatStatus } from '../utils/formatters'
import { AlertError } from './shared/AlertError'
import { Pagination } from './shared/Pagination'
import { Spinner } from './shared/Spinner'
import { TableSearch } from './shared/TableSearch'

export function RequisitionListMineView() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pageIndex, setPageIndex] = useState(0)

  const { data, isLoading, isFetching, error } = useRequisitionsMine({
    pageIndex: pageIndex + 1,
  })

  const rows = useMemo(() => data?.results ?? [], [data])
  const pageCount = data?.pages ?? 1

  const columns = React.useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ getValue }) => {
          const id = getValue()

          return (
            <Link className="link" to={requisitionDetailRoute.to} params={{ id: String(id) }}>
              {id}
            </Link>
          )
        },
      },
      { header: 'Name', accessorKey: 'name' },
      { header: 'External Ref', accessorFn: (row) => row.external_reference || '-' },
      { header: 'Status', accessorFn: (row) => formatStatus(row.status) },
      { header: 'Project', accessorFn: (row) => row.project?.name || '-' },
      { header: 'Supplier', accessorKey: 'supplier' },
      { header: 'Total Amount', accessorFn: (row) => formatAmount(row.total_amount) },
      { header: 'Currency', accessorFn: (row) => String(row.currency).toUpperCase() },
      { header: 'Submitted', accessorFn: (row) => formatDate(row.submitted_at) || '-' },
      { header: 'Approved', accessorFn: (row) => formatDate(row.approved_at) || '-' },
      { header: 'Rejected', accessorFn: (row) => formatDate(row.rejected_at) || '-' },
      { header: 'Created', accessorFn: (row) => formatDate(row.created_at) || '-' },
    ],
    []
  )
  const table = useReactTable({
    data: rows,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  function handleSearch(event) {
    setGlobalFilter(event.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <AlertError message={error.message} />
  }

  if (data.results.length === 0) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold">My Requisitions</h1>
        <p>You haven't created any requisitions yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">My Requisitions</h1>
      <div className="mb-3 flex items-center gap-2">
        <TableSearch searchValue={globalFilter} onValueChange={handleSearch} />
        <div className="ml-auto flex items-center gap-2">
          <Pagination
            pageIndex={pageIndex}
            pageCount={pageCount}
            onPageChange={setPageIndex}
            isFetching={isFetching}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-fixed w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="truncate whitespace-nowrap overflow-hidden">
                    {flexRender(
                      cell.column.columnDef.cell ?? cell.column.columnDef.header,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
