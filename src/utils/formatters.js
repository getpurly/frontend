export function formatAmount(amount) {
  try {
    return new Number(amount).toLocaleString()
  } catch {
    return amount
  }
}

export function formatDate(date) {
  if (!date) return '-'

  try {
    return new Date(date).toLocaleString()
  } catch {
    return date
  }
}

export function formatPaymentTerm(term) {
  switch (term) {
    case 'net_30':
      return 'Net 30'
    case 'net_45':
      return 'Net 45'
    case 'net_90':
      return 'Net 90'
    default:
      return term
  }
}
