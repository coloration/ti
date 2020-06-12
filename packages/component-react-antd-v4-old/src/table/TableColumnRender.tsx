import React from 'react'
import { numberFormat, NumberFormatEnum } from '@code/kit'
import { Tooltip } from 'antd'
import { TABLE_DEFAULT } from './types'
import { ary, flow } from 'lodash'

export const tableColDefRender = ary(function (t: any) {
  return <div>{ t || TABLE_DEFAULT }</div>
})

export function tableColShortRender(t: string, maxLength?: number) {
  maxLength = isNaN(Number(maxLength)) ? 10 : maxLength
  const isLong = (t || TABLE_DEFAULT).length > maxLength
  const content = String(t).substring(0, maxLength) + '...'
  return isLong ? (
    <Tooltip title={t}>
      <div>{ content }</div>
    </Tooltip>
  ) : (
    tableColDefRender(t)
  )
}

export const tableColCenterRender = ary(function (t: any) {
  return <div style={{ margin: '0 auto', textAlign: 'center' }}>
    { tableColDefRender(t) }
  </div>
})

export const tableColRightRender = ary(function (t: any) {
  return <div style={{ float: 'right', textAlign: 'right' }}>
    { tableColDefRender(t) }
  </div>
})

export const tableColLeftRender = ary(function (t: any) {
  return <div style={{ float: 'left', textAlign: 'left' }}>
    { tableColDefRender(t) }
  </div>
})

export const tableColNumRender = ary(function (t: any) {
  return t ? numberFormat(t, NumberFormatEnum.thousands) : TABLE_DEFAULT
})

export const tableColNumRightRender = flow([tableColNumRender, tableColRightRender])
export const tableColNumLeftRender = flow([tableColNumRender, tableColLeftRender])
export const tableColNumCenterRender = flow([tableColNumRender, tableColCenterRender])