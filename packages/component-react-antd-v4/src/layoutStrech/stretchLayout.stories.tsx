import React from 'react'
import { StretchLayout } from './index'

export default {
  title: 'Layout | Stretch Layout',
};

export const Demo = () => <div>

  <div style={{ height: 30, backgroundColor: 'steelblue' }}>
    One Header
  </div>
  <StretchLayout style={{ backgroundColor: 'orange' }} bottom={30}>
    StretchLayout Component

    根据元素距离顶部的距离计算出容器的高度, 可以设置 bottom 值
  </StretchLayout>
</div>

