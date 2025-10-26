export function RequisitionStatusBadge({ requisitionStatus }) {
  let badgeType = ''
  let status = ''

  switch (requisitionStatus) {
    case 'draft':
      badgeType = 'info'
      status = 'Draft'
      break
    case 'pending_approval':
      badgeType = 'warning'
      status = 'Pending Approval'
      break
    case 'rejected':
      badgeType = 'error'
      status = 'Rejected'
      break
    case 'approved':
      badgeType = 'primary'
      status = 'Approved'
      break
    default:
      badgeType = 'primary'
  }

  return <div className={`badge badge-${badgeType} px-4 py-3 font-semibold`}>{status}</div>
}
