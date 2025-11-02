import { useProject } from '../hooks/projects'
import { projectDetailRoute } from '../router'
import { formatDate } from '../utils/formatters'
import { Breadcrumb } from './shared/Breadcrumb'
import { ErrorAlert } from './shared/ErrorAlert'
import { Label } from './shared/Label'
import { Spinner } from './shared/Spinner'

export function ProjectDetailView() {
  const { id } = projectDetailRoute.useParams()
  const { data, isLoading, error } = useProject(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumb id={id} object="project" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">{data.name}</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-8">
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Summary
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
                  <Label name="ID" value={data.id} />
                  <Label name="Project Code" value={data.project_code} />
                  <Label name="Start Date" value={data.start_date} />
                  <Label name="End Date" value={data.end_date} />
                </div>
                <Label name="Description" value={data.description} />
              </section>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-1 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-6">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Activity
                </h2>
                <div className="space-y-4 text-sm">
                  <Label name="Created" value={formatDate(data.created_at)} />
                  <Label name="Created By" value={data.created_by.username} />
                  <Label name="Updated" value={formatDate(data.updated_at)} />
                  <Label name="Updated By" value={data.updated_by.username} />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-base-400">
                <button className="btn btn-outline w-full rounded-field text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
