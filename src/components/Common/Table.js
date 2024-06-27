import { useTable, useSortBy } from "react-table";


const Table = ({columns, data} ) => {
    const table = useTable({ columns, data }, useSortBy);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = table;
  
    return (
      <div className="container divide-y divide-gray-200 h-96 w-auto max-w-[700px] overflow-y-auto">
        <table {...getTableProps()}>
          <thead  className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                 
                  <th
                    {...column.getHeaderProps()}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {
    
              rows.map((row) => {

                prepareRow(row);
                return (
   
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {
                
                      row.cells.map((cell) => {
                
                        return (
                          <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                            {
                            
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  export default Table;