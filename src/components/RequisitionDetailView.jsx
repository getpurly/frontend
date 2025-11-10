import { useRequisition } from '../hooks/requisitions'
import { requisitionDetailRoute } from '../router'
import { formatAmount, formatDate } from '../utils/formatters'
import { RequisitionLineCard } from './RequisitionLineCard'
import { RequisitionStatusBadge } from './RequisitionStatusBadge'
import { AlertError } from './shared/AlertError'
import { Breadcrumb } from './shared/Breadcrumb'
import { Label } from './shared/Label'
import { Spinner } from './shared/Spinner'

export function RequisitionDetailView() {
  const { id } = requisitionDetailRoute.useParams()
  const { data, isLoading, error } = useRequisition(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <AlertError message={error.message} />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumb id={id} object="requisition" />
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
                  <Label name="Owner" value={data.owner?.username} />
                  <Label name="External Ref" value={data.external_reference} />
                  <Label name="Project" value={data.project?.name || '-'} />
                  <Label name="Supplier" value={data.supplier} />
                </div>
              </section>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-8">
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Justification
                </h2>
                <Label name="" value={data.justification} />
              </section>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Line Items ({data.lines?.length})
                </h2>
              </div>
              {data.lines.map((line) => (
                <RequisitionLineCard key={line.id} line={line} currency={data.currency} />
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:col-span-1 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-6">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Status
                </h2>
                <RequisitionStatusBadge requisitionStatus={data.status} />
              </div>
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Activity
                </h2>
                <div className="space-y-4 text-sm">
                  <Label name="Submitted" value={formatDate(data.submitted_at)} />
                  <Label name="Approved" value={formatDate(data.approved_at)} />
                  <Label name="Rejected" value={formatDate(data.rejected_at)} />
                  <Label name="Created" value={formatDate(data.created_at)} />
                  <Label name="Created By" value={data.created_by.username} />
                  <Label name="Updated" value={formatDate(data.updated_at)} />
                  <Label name="Updated By" value={data.updated_by.username} />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-base-400">
                <button className="btn btn-primary w-full rounded-field text-sm font-semibold">
                  Submit for Approval
                </button>
                <button className="btn btn-outline w-full rounded-field text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-4">
              <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                Financial
              </h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <Label name="Total Amount" value={formatAmount(data.total_amount)} />
                <Label name="Currency" value={data.currency} valueClassName="uppercase" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
