import React, { useMemo } from 'react';
import { Column } from 'react-table'
import { Table } from '../table/table'
import './app.css';

interface Row {
  year: number,
  months: number[],
  ytd: number,
}

function createData(): Row[] {
  return new Array(12).fill(0).map((_, index) => {
    const year = 2010 + index
    const months = new Array(12).fill(0).map(() => Math.random() * 10)
    const ytd = months.reduce((sum, month) => sum + month, 0)
    return { year, months, ytd }
  }) 
}

function createColumns(): Column<Row>[] {
  const columns: Column<Row>[] = [{
    Header: 'Year',
    accessor: 'year',
  }]
  new Array(12).fill(0).forEach((_, month) => {
    const date = new Date()
    date.setMonth(month)
    
    columns.push({
      Header: date.toLocaleDateString('en-US', { month: 'short' }),
      accessor: `months[${month}]` as 'months',
      Cell: (props: { value: number }) => props.value.toFixed(2) + ' %'
    })
  })
  columns.push({
    Header: 'YTD',
    accessor: 'ytd',
    Cell: (props: { value: number }) => props.value.toFixed(2) + ' %',
  })

  return columns
}

export function App() {
  const data = useMemo(createData, [])
  const columns = React.useMemo(createColumns, [])
  
  return (
    <div className="page">
      <h1 className="page_header">Monthly return</h1>
      <Table data={data} columns={columns} />
    </div>
  )
}