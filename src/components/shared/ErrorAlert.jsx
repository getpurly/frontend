export function ErrorAlert({ error }) {
  return (
    <div role="alert" className="alert alert-error alert-outline">
      <span>Error: {error.message}</span>
    </div>
  )
}
