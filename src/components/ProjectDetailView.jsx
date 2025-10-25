import { useProject } from '../hooks/projects'
import { projectDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function ProjectDetailView() {
  const { id } = projectDetailRoute.useParams()
  const { data: project, isLoading, error } = useProject(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Project: {project.name}</h1>
    </div>
  )
}
