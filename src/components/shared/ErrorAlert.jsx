export function ErrorAlert({ message }) {
  return (
    <div role="alert" className="alert alert-error alert-outline">
      <span>Error: {message}</span>
    </div>
  )
}
