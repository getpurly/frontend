import { SmallSpinner } from './SmallSpinner'

export function Pagination({ pageIndex, pageCount, onPageChange, isFetching = false }) {
  const atFirst = pageIndex === 0
  const atLast = pageIndex === pageCount - 1

  const first = () => onPageChange(0)
  const prev = () => {
    if (!atFirst) {
      onPageChange(pageIndex - 1)
    }
  }
  const next = () => {
    if (!atLast) {
      onPageChange(pageIndex + 1)
    }
  }
  const last = () => onPageChange(pageCount - 1)

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-outline btn-sm" onClick={first} disabled={atFirst || isFetching}>
        First
      </button>
      <button className="btn btn-outline btn-sm" onClick={prev} disabled={atFirst || isFetching}>
        Prev
      </button>
      <span className="text-sm opacity-75">
        {isFetching ? (
          <SmallSpinner />
        ) : (
          <>
            Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
          </>
        )}
      </span>
      <button className="btn btn-outline btn-sm" onClick={next} disabled={atLast || isFetching}>
        Next
      </button>
      <button className="btn btn-outline btn-sm" onClick={last} disabled={atLast || isFetching}>
        Last
      </button>
    </div>
  )
}
