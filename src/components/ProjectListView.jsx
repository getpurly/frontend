import { Link } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'

import { useProjects } from '../hooks/projects'
import { projectDetailRoute } from '../router'
import { formatDate } from '../utils/formatters'
import { ErrorAlert } from './shared/ErrorAlert'
import { Pagination } from './shared/Pagination'
import { Spinner } from './shared/Spinner'

export function ProjectListView() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pageIndex, setPageIndex] = useState(0)

  const { data, isLoading, isFetching, error } = useProjects({
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
            <Link className="link" to={projectDetailRoute.to} params={{ id: String(id) }}>
              {id}
            </Link>
          )
        },
      },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Project Code', accessorKey: 'project_code' },
      { header: 'Start Date', accessorKey: 'start_date' },
      { header: 'End Date', accessorKey: 'end_date' },
      { header: 'Created', accessorFn: (row) => formatDate(row.created_at) || '-' },
      { header: 'Updated', accessorFn: (row) => formatDate(row.updated_at) || '-' },
    ],
    []
  )
  const table = useReactTable({
    data: rows,
    columns,
    pageCount,
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
    return <ErrorAlert error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Projects</h1>
        <p>No projects have been created yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Projects</h1>
      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={globalFilter}
          onChange={handleSearch}
        />
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
        <table className="table w-full">
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
                  <td key={cell.id}>
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
