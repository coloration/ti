import React from 'react'
// import { action } from '@storybook/addon-actions'
import { TabHeader } from './index'
// import notes from './tabHeader.md'


export default {
  title: 'Component | Tab Header',
  parameters: { notes: '123456' }
};

export const Demo = () => {
  return (
    <TabHeader 
      title="人群管理" 
      tabs={[
        { name: '标签人群', key: 'label', },
        { name: '上传人群', key: 'upload', disabled: true },
        { name: '组合人群', key: 'composition', },
      ]}
    />
  )
}