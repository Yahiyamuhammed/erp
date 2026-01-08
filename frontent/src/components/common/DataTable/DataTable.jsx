import RowActions from "./RowActions";

export default function DataTable({
  title,
  subtitle,
  columns,
  data,
  actions = [],
  isLoading,
  emptyText = "No data found",
}) {
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`p-4 text-left text-sm font-semibold ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="p-4 text-right text-sm font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map(row => (
              <tr key={row._id} className="border-t hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="p-4 text-sm">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="p-4 text-right">
                    <RowActions row={row} actions={actions} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          {emptyText}
        </div>
      )}
    </div>
  );
}
