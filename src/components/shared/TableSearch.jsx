export function TableSearch({ searchValue, onValueChange }) {
  return (
    <input
      type="text"
      className="input"
      placeholder="Search..."
      value={searchValue}
      onChange={onValueChange}
    />
  )
}
