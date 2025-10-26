import { useRequisition } from '../hooks/requisitions'
import { requisitionDetailRoute } from '../router'
import { formatAmount, formatDate } from '../utils/formatters'
import { RequisitionDetailBreadcrumb } from './RequisitionDetailBreadcrumb'
import { RequisitionLineCard } from './RequisitionLineCard'
import { RequisitionStatusBadge } from './RequisitionStatusBadge'
import { ErrorAlert } from './shared/ErrorAlert'
import { Label } from './shared/Label'
import { Spinner } from './shared/Spinner'

export function RequisitionDetailView() {
  const { id } = requisitionDetailRoute.useParams()
  const { data: requisition, isLoading, error } = useRequisition(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <RequisitionDetailBreadcrumb id={id} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">{requisition.name}</h1>
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
                  <Label name="ID" value={requisition.id} />
                  <Label name="Owner" value={requisition.owner?.username} />
                  <Label name="External Ref" value={requisition.external_reference} />
                  <Label name="Project" value={requisition.project?.name || '-'} />
                  <Label name="Supplier" value={requisition.supplier} />
                </div>
                <Label name="Justification" value={requisition.justification} />
              </section>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Line Items ({requisition.lines?.length})
                </h2>
              </div>
              {requisition.lines.map((line) => (
                <RequisitionLineCard key={line.id} line={line} currency={requisition.currency} />
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
                <RequisitionStatusBadge requisitionStatus={requisition.status} />
              </div>
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
                  Activity
                </h2>
                <div className="space-y-4 text-sm">
                  <Label name="Submitted" value={formatDate(requisition.submitted_at)} />
                  <Label name="Approved" value={formatDate(requisition.approved_at)} />
                  <Label name="Rejected" value={formatDate(requisition.rejected_at)} />
                  <Label name="Created" value={formatDate(requisition.created_at)} />
                  <Label name="Created By" value={requisition.created_by.username} />
                  <Label name="Updated" value={formatDate(requisition.updated_at)} />
                  <Label name="Updated By" value={requisition.updated_by.username} />
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
                <Label name="Total Amount" value={formatAmount(requisition.total_amount)} />
                <Label name="Currency" value={requisition.currency} valueClassName="uppercase" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
