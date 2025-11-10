import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'

import { AddressCreateView } from './components/AddressCreateView'
import { AddressDetailView } from './components/AddressDetailView'
import { AddressListMineView } from './components/AddressListMineView'
import { NavBar } from './components/NavBar'
import { ProjectDetailView } from './components/ProjectDetailView'
import { ProjectListView } from './components/ProjectListView'
import { RequisitionDetailView } from './components/RequisitionDetailView'
import { RequisitionListMineView } from './components/RequisitionListMineView'
import { useTokenStore } from './stores/tokenStore'
import { useUserStore } from './stores/userStore'

async function userCheck() {
  const { userData, fetchUser } = useUserStore.getState()
  const { fetchToken } = useTokenStore.getState()

  if (!userData) {
    await fetchUser().then(fetchToken)
  }

  const { userData: user } = useUserStore.getState()

  if (!user) {
    throw redirect({ href: 'http://localhost:8000/accounts/login/' })
  }

  return { user }
}

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-base-300 text-white">
      <NavBar />
      <main className="flex-1 ml-48 p-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

const rootRoute = createRootRoute({
  beforeLoad: userCheck,
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

export const requisitionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/requisitions',
  component: () => <Outlet />,
})

export const requisitionsListMineRoute = createRoute({
  getParentRoute: () => requisitionRoute,
  path: '/',
  component: RequisitionListMineView,
})

export const requisitionDetailRoute = createRoute({
  getParentRoute: () => requisitionRoute,
  path: '$id',
  component: RequisitionDetailView,
})

const requisitionCreateRoute = createRoute({
  getParentRoute: () => requisitionRoute,
  path: 'create',
  component: () => <div>TODO CREATE REQUISITIONS</div>,
})

export const addressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/addresses',
  component: () => <Outlet />,
})

export const addressListMineRoute = createRoute({
  getParentRoute: () => addressRoute,
  path: '/',
  component: AddressListMineView,
})

export const addressDetailRoute = createRoute({
  getParentRoute: () => addressRoute,
  path: '$id',
  component: AddressDetailView,
})

export const addressCreateRoute = createRoute({
  getParentRoute: () => addressRoute,
  path: 'create',
  component: AddressCreateView,
})

export const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: () => <Outlet />,
})

export const projectListRoute = createRoute({
  getParentRoute: () => projectRoute,
  path: '/',
  component: ProjectListView,
})

export const projectDetailRoute = createRoute({
  getParentRoute: () => projectRoute,
  path: '$id',
  component: ProjectDetailView,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  requisitionRoute.addChildren([
    requisitionsListMineRoute,
    requisitionDetailRoute,
    requisitionCreateRoute,
  ]),
  addressRoute.addChildren([addressListMineRoute, addressDetailRoute, addressCreateRoute]),
  projectRoute.addChildren([projectListRoute, projectDetailRoute]),
])

export const router = createRouter({ routeTree })

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
