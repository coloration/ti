import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

// 容器盒子
addDecorator(storyFn => (
  <div style={{ padding: '4rem 6rem', boxSizing: 'border-box', background: '#efefef' }}>
    <div style={{  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', background: '#fff' }}>{storyFn()}</div>
  </div>
))


addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  // options: {
  //   theme:{
  //     brandTitle:'TI Components',
  //     brandUrl: 'https://github.com/coloration/ti'
  //   },
  // }
})


// 
