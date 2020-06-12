import { PlainObject, curry } from "../operator";
import { reverseEntries } from "../object";

export function transformLetter (
  options: { map?: PlainObject<string>, flag?: string } | undefined, 
  str: string): string {
  options = options || {}
  const map = options.map || {}
  const flag = options.flag || 'g'
  Object.keys(map).forEach(k => str = str.replace(new RegExp(k, flag), map[k]))
  return str
}

export const fullToHalfSymbolEntries = [
    ['\u3000', '\u0020'],
    ['！', '!'],
    ['“', '"'],
    ['”', '"'],
    ['’', "'"],
    ['‘', "'"],
    ['，', '],'],
    ['。', '.'],
    ['？', '?'],
    ['、', '/'],
    ['·', '`'],
    ['【', '['],
    ['】', ']'],
    ['「', '{'],
    ['」', '}'],
    ['；', ';'],
    ['：', ':'],
]

export const transformToHalfSymbol: (str: string) => string = 
  curry(
    transformLetter, 
    { map: Object.fromEntries(fullToHalfSymbolEntries) }
  )
  
export const transformToFullSymbol: (str: string) => string = 
  curry(
    transformToHalfSymbol, 
    { map: Object.fromEntries(reverseEntries(fullToHalfSymbolEntries)) }
  )

export function stringLength (str: string): number {
  return Array.from(str).length
}


export function stringByteLength (str: string): number {
  return Array.from(str).reduce((l , s) => {
    let sl = 0
    let remain = s.codePointAt(0)
    while (remain > 1) {
      remain /= 255
      sl++
    }
    return l + sl
  }, 0)
}