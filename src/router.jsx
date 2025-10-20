import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  redirect,
  Outlet,
} from '@tanstack/react-router'

import { useUserStore } from './stores/userStore'

import { RequisitionDetailView } from './components/RequisitionDetailView'
import { RequisitionMineListView } from './components/RequisitionMineListView'
import { NavBar } from './components/NavBar'

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

export const requisitionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requisitions',
  component: () => <Outlet />,
})

export const requisitionMineListRoute = createRoute({
  getParentRoute: () => requisitionsRoute,
  path: '/',
  component: RequisitionMineListView,
})

export const requisitionDetailRoute = createRoute({
  getParentRoute: () => requisitionsRoute,
  path: '$id',
  component: RequisitionDetailView,
})

const requisitionCreateRoute = createRoute({
  getParentRoute: () => requisitionsRoute,
  path: 'create',
  component: () => <div>TODO CREATE REQUISITIONS</div>,
})

export const addressesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/addresses',
  component: () => <Outlet />,
})

export const addressesMineListRoute = createRoute({
  getParentRoute: () => addressesRoute,
  path: '/',
  component: () => <div>TODO LIST ADDRESSES</div>,
})

export const addressDetailRoute = createRoute({
  getParentRoute: () => addressesRoute,
  path: '$id',
  component: () => <div>TODO DETAIL ADDRESSES</div>,
})

export const addressCreateRoute = createRoute({
  getParentRoute: () => addressesRoute,
  path: 'create',
  component: () => <div>TODO CREATE ADDRESSES</div>,
})

export const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: () => <Outlet />,
})

export const projectsListRoute = createRoute({
  getParentRoute: () => projectsRoute,
  path: '/',
  component: () => <div>TODO LIST PROJECTS</div>,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  requisitionsRoute.addChildren([
    requisitionMineListRoute,
    requisitionDetailRoute,
    requisitionCreateRoute,
  ]),
  addressesRoute.addChildren([addressesMineListRoute, addressDetailRoute, addressCreateRoute]),
  projectsRoute.addChildren([projectsListRoute]),
])

export const router = createRouter({ routeTree })

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
