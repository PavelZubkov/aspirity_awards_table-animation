import React from 'react';
import { TableInstance } from 'react-table'
import { Motion } from '../motion/motion'
import './table.css'

function sortAnimation(
  ref: React.MutableRefObject<HTMLElement>,
  current: DOMRect,
  prev?: DOMRect,
) {
  if (!prev) return

  const animations = ref.current.getAnimations()
  if (animations.some(animation => animation.playState === 'running')) {
    return
  }

  const diff = prev.bottom - current.bottom 
  if (diff === 0) return
    
  ref.current.style.zIndex = String(Math.ceil(window.innerHeight - current.top))
  ref.current.animate([
    {
      transform: `translate(0, ${diff}px)`,
    },
    { 
      transform: 'translateX(0) translate(0, 0)',
    },
  ], {
      duration: Math.abs(1.8 * diff),
      easing: 'ease-out',
  })
}

function TableRow(props: { [name:string]: any }) {
  return (
    <Motion
      {...props}
      as="tr"
      handleRender={sortAnimation}
    >{props.children}
    </Motion>
  )
}

interface ITable<Row extends object> {
  table: TableInstance<Row>
}

export function Table<Row extends object>({ table }: ITable<Row>) {
  const renderedTable = (
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
            <TableRow {...row.getRowProps()} className="table_row">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="table_cell">
                  {cell.render('Cell')}
                </td>
              ))}
            </TableRow>
          )
        })}
      </tbody>
    </table>
  )
  
  return (
    <div className="table_outline">
      {renderedTable}
    </div>
  )
}

export default Table;
