import { useRequisition } from '../hooks/requisitions'
import { requisitionDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function RequisitionDetailView() {
  const { id } = requisitionDetailRoute.useParams()
  const { data: requisition, isLoading, error } = useRequisition(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Requisition: {requisition.name}</h1>
    </div>
  )
}
