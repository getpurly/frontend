import { useEffect } from 'react'

import { useUserStore } from './stores/userStore'
import { useTokenStore } from './stores/tokenStore'

import { RequisitionMineListView } from './components/RequisitionMineListView'

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser)
  const userData = useUserStore((state) => state.userData)
  const userError = useUserStore((state) => state.error)

  const fetchToken = useTokenStore((state) => state.fetchToken)
  const token = useTokenStore((state) => state.token)

  useEffect(() => {
    fetchUser().then(fetchToken)
  }, [fetchUser])

  if (userError) {
    return <div>Error fetching user data: {error}</div>
  }

  // stop render before redirect
  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-base-300">
      <aside className="w-48 bg-base-100 shadow-md p-4 flex flex-col justify-between">
        {/* Top Menu */}
        <ul className="menu menu-vertical w-full space-y-1">
          <li className="menu-title">Requisitions</li>
          <li>
            <a href="http://localhost:8000/requisitions/list">List</a>
          </li>
          <li>
            <a href="http://localhost:8000/requisitions/submit">Submit</a>
          </li>

          <li className="menu-title">Addresses</li>
          <li>
            <a href="http://localhost:8000/addresses/list">List</a>
          </li>
          <li>
            <a href="http://localhost:8000/addresses/create">Create</a>
          </li>
        </ul>

        {/* Bottom Account Menu */}
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-4 text-2xl font-semibold">Hello, {userData.username}</h1>
        <p className="mb-6 text-sm text-gray-500">Token: {token}</p>
        <RequisitionMineListView />
      </main>
    </div>
  )
}

export default App
