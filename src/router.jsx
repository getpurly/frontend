import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { NavBar } from './components/NavBar'
import { RequisitionMineListView } from './components/RequisitionMineListView'
import { useUserStore } from './stores/userStore'

async function requireUser() {
  const { userData, fetchUser } = useUserStore.getState()

  if (!userData) {
    await fetchUser()
  }

  const { userData: user } = useUserStore.getState()

  if (!user) {
    throw redirect({ href: 'http://localhost:8000/accounts/login/' })
  }

  return { user }
}

function RootLayout() {
  return (
    <div className="min-h-screen flex bg-base-300">
      <NavBar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

const rootRoute = createRootRoute({
  beforeLoad: requireUser,
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    const userData = useUserStore((state) => state.userData)
    return <h2>Hello, {userData.username}</h2>
  },
})

const reqListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requisitions/list',
  component: RequisitionMineListView,
})

const reqCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requisitions/create',
  component: () => <div>TODO</div>,
})

const addressListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/addresses/list',
  component: () => <div>TODO</div>,
})

const addressCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/addresses/create',
  component: () => <div>TODO</div>,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  reqListRoute,
  reqCreateRoute,
  addressListRoute,
  addressCreateRoute,
])

export const router = createRouter({ routeTree })

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
