import { Link } from '@tanstack/react-router'

export function Breadcrumb({ id, object }) {
  switch (object) {
    case 'requisition':
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
    case 'project':
      return (
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>Project {id}</li>
          </ul>
        </div>
      )
    case 'address':
      return (
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addresses">Addresses</Link>
            </li>
            <li>Address {id}</li>
          </ul>
        </div>
      )
  }
}
