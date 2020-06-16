import React from 'react'
import { numberFormat, NumberFormatEnum, isNumber, isDefind } from '@code/kit'
import { Tooltip } from 'antd'
import { TABLE_DEFAULT } from '../shared'
import { ary, flow } from 'lodash'

export const tableColDefRender = ary(function (t: any) {
  return <div>{ isDefind(t) ? t : TABLE_DEFAULT }</div>
})

export function tableColShortRender(t: string, maxLength?: number) {
  const max = (isNumber(maxLength) ? maxLength : 10) as number
  const isLong = (t || TABLE_DEFAULT).length > max
  const content = String(t).substring(0, max) + '...'
  return isLong ? (
    <Tooltip title={t}>
      <div>{ content }</div>
    </Tooltip>
  ) : (
    tableColDefRender(t)
  )
}

export const tableColNumRender = ary(function (t: any) {
  return t ? numberFormat(t, NumberFormatEnum.thousands) : TABLE_DEFAULT
})

const centerRender = ary((t: any) => <div style={{ margin: '0 auto', textAlign: 'center' }}>{t}</div>)
const rightRender = ary((t: any) => <div style={{ float: 'right', textAlign: 'center' }}>{t}</div>)
const leftRender = ary((t: any) => <div style={{ float: 'left', textAlign: 'left' }}>{t}</div>)


export const tableColCenterRender = flow([tableColDefRender, centerRender])
export const tableColLeftRender = flow([tableColDefRender, leftRender])
export const tableColRightRender = flow([tableColDefRender, rightRender])
export const tableColNumRightRender = flow([tableColNumRender, tableColRightRender])
export const tableColNumLeftRender = flow([tableColNumRender, tableColLeftRender])
export const tableColNumCenterRender = flow([tableColNumRender, tableColCenterRender])