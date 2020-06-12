import React, { FC, useState } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { TablePageSize } from './types'
import { locales } from './utils'
import { numberFormat } from '@code/kit'
import { useI18nLocale } from '@code/use-react'



export const SelfPaginationTable: FC<{
  pageSize?: number
} & TableProps<any>> = ({
  pageSize,
  dataSource,
  ...otherProps
}) => {

  const [page, setPage] = useState(1)
  const [innerLocale] = useI18nLocale(locales)

  return (
    <Table
      rowKey={(_, i) => String(i)}
      rowClassName={(_, i) => i % 2 === 0 ? '' : 'bg-gray-100'}
      dataSource={dataSource}
      pagination={{
        current: page,
        defaultPageSize: pageSize || TablePageSize.p20,
        showQuickJumper: true,
        showSizeChanger: true,
        total: dataSource.length,
        onChange: setPage,
        showTotal: n => innerLocale.total + numberFormat(n) + innerLocale.unit
      }}
      {...otherProps} />
  )
}