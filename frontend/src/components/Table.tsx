type EmeraldTableProps = {
  columns: string[];
  data: any[];
  classname?: string; 
};

const EmeraldTable = ({ columns, data, classname = 'hidden md:block max-h-screen overflow-y-auto' }: EmeraldTableProps) => {
  return (
    <div className="w-full">
      {/* ✅ Desktop / Tablet View */}
      <div className={classname}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                {columns.map((column) => (
                  <th 
                    key={column} 
                    className="py-4 px-6 text-left text-sm font-semibold text-white"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0 hover:bg-emerald-50/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column} className="py-4 px-6 text-sm text-gray-700">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Mobile View (Cards) */}
      <div className="block md:hidden space-y-4">
        {data.map((row, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3">
              <span className="text-white font-semibold text-sm">
                Item #{index + 1}
              </span>
            </div>
            <div className="p-4 space-y-3">
              {columns.map((column) => (
                <div key={column} className="flex justify-between items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">
                    {column}
                  </span>
                  <span className="text-sm text-gray-900 font-medium text-right">
                    {row[column]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmeraldTable;