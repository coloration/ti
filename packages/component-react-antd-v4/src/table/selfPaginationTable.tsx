import React, { useState } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { TablePageSize, locales } from '../shared'
import { numberFormat } from '@code/kit'
import { useI18nLocale } from '@code/use-react'

export interface ISelfPaginationTableProps<RecordType> extends TableProps<RecordType> {
  pageSize?: number
}

export function SelfPaginationTable<RecordType extends object = any>({
  pageSize,
  dataSource,
  ...otherProps
}: ISelfPaginationTableProps<RecordType>) {

  const [page, setPage] = useState(1)
  const [innerLocale] = useI18nLocale<any>(locales)

  return (
    <Table
      rowKey={(_, i) => String(i)}
      rowClassName={(_, i) => i % 2 === 0 ? '' : 'cra-table_even-row__dark'}
      dataSource={dataSource}
      pagination={{
        current: page,
        defaultPageSize: pageSize || TablePageSize.p20,
        showQuickJumper: true,
        showSizeChanger: true,
        total: dataSource ? dataSource.length : 0,
        onChange: setPage,
        showTotal: n => innerLocale.total + numberFormat(n) + innerLocale.unit
      }}
      {...otherProps} />
  )
}