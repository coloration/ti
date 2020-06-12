import { 
  transformLetter, 
  transformToFullSymbol,
  transformToHalfSymbol,
  stringLength,
  stringByteLength,
} from '../src/string'
import { curry } from '../src'

describe('unicode string length', () => {
  test('stringLength', () => {
    
    expect(stringLength("董存瑞")).toBe(3)
    expect(stringLength("𝄞")).toBe(1)
    expect(stringLength("𝌆12")).toBe(3)
    expect(stringLength("im dongcunrui 大队长𝌆")).toBe(18)
    
  })

  test('stringByteLength', () => {
    
    expect(stringByteLength("董存瑞")).toBe(6)
    expect(stringByteLength("𝄞")).toBe(3)
    expect(stringByteLength("𝌆12")).toBe(5)
    expect(stringByteLength("im dongcunrui 大队长𝌆")).toBe(23)
    
  })


  test('transformLetter default behaviour', () => {
    expect(transformLetter(undefined, 'ssss')).toBe('ssss')
    expect(transformLetter({ map: { s: '丝'}}, 'ssSs')).toBe('丝丝S丝')
    expect(transformLetter({ map: { s: '丝'}, flag: 'ig' }, 'ssSs')).toBe('丝丝丝丝')
  })

  test('transformLetter', () => {
    const ZH_CH_LOCALE = {
      'confirm': '确认',
      'delete': '删除'
    }

    const translateENToCH = curry(transformLetter, { map: ZH_CH_LOCALE })

    expect(translateENToCH('confirm delete?')).toBe('确认 删除?')
    expect(translateENToCH('confirmConfirm delete?')).toBe('确认Confirm 删除?')
    expect(translateENToCH('confirm delete?')).toBe('确认 删除?')
    expect(translateENToCH('confirm deletedelete?')).toBe('确认 删除删除?')
  })
})