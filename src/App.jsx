import { useEffect } from 'react'

import { useUserStore } from './stores/userStore'
import { useTokenStore } from './stores/tokenStore'

import { RequisitionMineListView } from './components/RequisitionMineListView'

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser)
  const userData = useUserStore((state) => state.userData)
  const loading = useUserStore((state) => state.loading)
  const error = useUserStore((state) => state.error)

  const fetchToken = useTokenStore((state) => state.fetchToken)
  const token = useTokenStore((state) => state.token)

  useEffect(() => {
    fetchUser().then(fetchToken)
  }, [fetchUser])

  if (loading) {
    return <div>Loading user data...</div>
  }

  if (error) {
    return <div>Unexpected error while fetching user data: {error}</div>
  }

  if (!userData) {
    return null
  }

  return (
    <div>
      <p>Hello, {userData.username}</p>
      <p>Token: {token}</p>
      <p>
        <a href="http://localhost:8000/accounts/email/">Change Email</a>
      </p>
      <p>
        <a href="http://localhost:8000/accounts/password/change/">Change Password</a>
      </p>
      <p>
        <a href="http://localhost:8000/accounts/logout/">Sign Out</a>
      </p>
      <div>
        <RequisitionMineListView />
      </div>
    </div>
  )
}

export default App
