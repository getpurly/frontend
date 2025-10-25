import { useRequisition } from '../hooks/requisitions'
import { requisitionDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

function formatDate(date) {
  if (!date) return '-'

  try {
    return new Date(date).toLocaleString()
  } catch {
    return date
  }
}

function formatAmount(amount) {
  try {
    return new Number(amount).toLocaleString()
  } catch {
    return amount
  }
}

function formatPaymentTerm(term) {
  switch (term) {
    case 'net_30':
      return new String('Net 30')
    case 'net_45':
      return new String('Net 45')
    case 'net_90':
      return new String('Net 90')
    default:
      return term
  }
}

function Label({ name, value }) {
  return (
    <div className="space-y-1">
      <div className="text-[0.65rem] uppercase text-neutral-500 font-medium tracking-wide">
        {name}
      </div>
      <div className="text-sm font-medium text-neutral-200 break-words">{value || '-'}</div>
    </div>
  )
}

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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{requisition.name}</h1>
        </div>
        <div className="badge badge-lg badge-primary px-4 py-3 text-base font-medium self-start">
          {requisition.status}
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-lg">
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
              <Label name="Supplier" value={requisition.supplier.name} />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
              Financial
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
              <Label name="Total Amount" value={formatAmount(requisition.total_amount)} />
              <Label name="Currency" value={requisition.currency?.toUpperCase()} />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
              Justification
            </h2>
            <div className="rounded-md bg-base-100/5 border border-base-400/40 p-2 text-sm font-medium text-neutral-200 leading-relaxed whitespace-pre-line">
              {requisition.justification || '-'}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
              Timestamps
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
              <Label name="Submitted At" value={formatDate(requisition.submitted_at)} />
              <Label name="Approved At" value={formatDate(requisition.approved_at)} />
              <Label name="Rejected At" value={formatDate(requisition.rejected_at)} />
              <Label name="Created At" value={formatDate(requisition.created_at)} />
            </div>
          </section>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
              Line Items
            </h2>
            <span className="text-sm text-neutral-400">
              {requisition.lines?.length || 0} item
              {requisition.lines?.length === 1 ? '' : 's'}
            </span>
          </div>

          {requisition.lines?.map((line) => (
            <div
              key={line.id}
              className="rounded-md bg-base-100/5 border border-base-400/40 p-2 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Line {line.line_number}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">
                    {formatAmount(line.line_total)}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase">{requisition.currency}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
                <Label name="Description" value={line.description} />
                <span className="capitalize">
                  <Label name="Line Type" value={line.line_type} />
                </span>
                <span className="capitalize">
                  <Label name="Category" value={line.category} />
                </span>
                <Label name="Manufacturer" value={line.manufacturer || '-'} />
                <Label name="Part Number" value={line.manufacturer_part_number || '-'} />
                {line.line_type === 'goods' ? (
                  <>
                    <Label name="Quantity" value={line.quantity != null ? line.quantity : '-'} />
                    <Label name="Unit of Measure" value={line.uom} />
                    <Label name="Unit Price" value={line.unit_price} />
                  </>
                ) : null}
                <Label name="Payment Term" value={formatPaymentTerm(line.payment_term)} />
                <Label name="Need By" value={line.need_by} />
                <Label name="Ship To" value={line.ship_to?.name || '-'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
