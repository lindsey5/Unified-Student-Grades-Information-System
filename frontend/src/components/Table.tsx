type EmeraldTableProps = {
  columns: string[];
  data: any[];
  classname?: string;
};

const EmeraldTable = ({
  columns,
  data,
  classname,
}: EmeraldTableProps) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200">
      <div className={`hidden md:block max-h-screen overflow-y-auto ${classname}`}>
        <table className="min-w-full border-collapse">
          <thead className="bg-emerald-600 text-white text-left text-sm font-medium sticky top-0">
            <tr>
              {columns.map((column) => (
                <th key={column} className="py-3 px-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition border-b border-gray-200"
              >
                {columns.map((column) => (
                  <td key={column} className="py-3 px-4 text-sm">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden p-4 space-y-4">
        {data.map((row, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200"
          >
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column} className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-emerald-700 text-xs uppercase tracking-wide flex-shrink-0">
                    {column}
                  </span>
                  <span className="text-gray-900 text-sm text-right font-medium">
                    {row[column]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100">
              <span className="text-xs text-emerald-600 font-medium">
                Item {index + 1} of {data.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmeraldTable;
