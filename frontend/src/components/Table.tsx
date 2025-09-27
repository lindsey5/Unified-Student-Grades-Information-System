type EmeraldTableProps = {
  columns: string[];
  data: any[];
};

const EmeraldTable = ({ columns, data }: EmeraldTableProps) => {
  return (
    <div className="w-full max-h-screen overflow-y-auto bg-white shadow-sm rounded-lg border border-gray-200">
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
                <td key={column} className="py-3 px-4">
                    {row[column]}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};
export default EmeraldTable;