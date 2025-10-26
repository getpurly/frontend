export function Label({ name, value, valueClassName = '' }) {
  return (
    <div className="space-y-1">
      <div className="text-[0.65rem] font-medium text-neutral-500 uppercase tracking-wide">
        {name}
      </div>
      <div className={`text-sm font-medium text-neutral-300 break-words ${valueClassName}`}>
        {value || '-'}
      </div>
    </div>
  )
}
