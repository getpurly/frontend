import { Link } from '@tanstack/react-router'

export function RequisitionDetailBreadcrumb({ id }) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/requisitions">Requisitions</Link>
        </li>
        <li>Requisition {id}</li>
      </ul>
    </div>
  )
}
