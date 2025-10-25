import { Link } from '@tanstack/react-router'

import { useProjects } from '../hooks/projects'
import { projectDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function ProjectListView() {
  const { data: projects, isLoading, error } = useProjects()

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  if (projects.results.length === 0) {
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {projects.results.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    className="link"
                    to={projectDetailRoute.to}
                    params={{ id: String(item.id) }}
                  >
                    {item.id}
                  </Link>
                </td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
