import { Link } from '@tanstack/react-router'

export function NavBar() {
  return (
    <aside className="w-48 bg-base-100 shadow-md p-4 flex flex-col justify-between">
      <ul className="menu menu-vertical w-full space-y-1">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="menu-title">Requisitions</li>
        <li>
          <Link to="/requisitions">List</Link>
        </li>
        <li>
          <Link to="/requisitions/create">Create</Link>
        </li>
        <li className="menu-title">Addresses</li>
        <li>
          <Link to="/addresses">List</Link>
        </li>
        <li>
          <Link to="/addresses/create">Create</Link>
        </li>
        <li className="menu-title">Projects</li>
        <li>
          <Link to="/projects">List</Link>
        </li>
      </ul>
      <ul className="menu menu-vertical w-full space-y-1 mt-6">
        <li className="menu-title">Account</li>
        <li>
          <a href="http://localhost:8000/accounts/email/">Change Email</a>
        </li>
        <li>
          <a href="http://localhost:8000/accounts/password/change/">Change Password</a>
        </li>
        <li>
          <a href="http://localhost:8000/accounts/logout/" className="text-error">
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  )
}
