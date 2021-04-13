import React from 'react';
import {
  useTable,
  useSortBy,
  Column,
} from 'react-table'
import { Motion } from '../motion/motion'
import './table.css'

export function Table<Row extends object>({ data, columns }: { data: Row[], columns: Column<Row>[] }) {
  const table = useTable({
    data,
    columns,
    initialState: { sortBy: [{ id: 'year' }] },
  }, useSortBy)

  return (
    <table {...table.getTableProps()} className="table">
      <thead className="table_head">
        {table.headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="table_row_head">
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table_cell_head">
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...table.getTableBodyProps()} className="table_body">
        {table.rows.map(row => {
          table.prepareRow(row)
          return (
            <Motion as="tr" {...row.getRowProps()} className="table_row">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="table_cell">
                  {cell.render('Cell')}
                </td>
              ))}
            </Motion>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;
