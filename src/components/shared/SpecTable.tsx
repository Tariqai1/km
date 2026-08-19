export default function SpecTable({ specifications }: { specifications: Record<string, string> }) {
  const entries = Object.entries(specifications || {});

  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <tbody>
          {entries.map(([key, value], index) => (
            <tr 
              key={key} 
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <th className="py-3 px-4 font-semibold text-brand-dark w-1/3 border-b border-gray-100">
                {key}
              </th>
              <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
