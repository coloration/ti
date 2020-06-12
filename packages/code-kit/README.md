# Coloration/Kit

- [Document](http://docs.coloration.top/kit/)

项目里常用的工具库函数，可以配合 ramda.js 或者 lodash.js 进行柯里化再使用, 本项目导出的 
`curry` 不支持占位符功能


#### Start Up
```bash
$ yarn add @coloration/kit
```

#### Use

``` js
import { arrayAdd, arrayRemove, curry } from '@coloration/kit'

const arrAdd = curry(undefined)
const arr = arrAdd([1, 2, 3, 4], [2, 4, 5, 7])
// [1, 2, 3, 4, 5, 7]
const arr2 = arrayRemove(undefined, arr, [8, 7, 6, 5])
// [1, 2, 3, 4]
```




## Structure

- ★: finished, tested
- ☆: finished, testing
- \[empty\]: finishing

``` 
/-src
|- [★]array/
|  |- [★Function]toArray
|  |- [★Function]arrayAdd
|  |- [★Function]arrayRemove
|  |- [★Function]arrayIncludes
|  |-...
|
|- [★]const/
|  |-...
|
|- [☆]dom/
|  |- [☆Function]copyToClipBoard
|  |- [☆Function]download
|  |- [☆Function]downloadAsFile
|  |- [☆Function]downloadAsCsv
|  |- [☆Function]getOffset
|  |- [☆Function]getOffsetFromBody
|  |-...
|
|- [☆]math/
|  |- [☆Function]a
|  |- [☆Function]c
|  |- [-Function]aPick
|  |- [☆Function]cPick
|  |-...
|
|- [☆]number/
|  |- [★Enum]NumberFormatEnum
|  |- [☆Function]numberFormat
|  |-...
|
|- [☆]object/
|  |- [☆Function]objectHas
|  |- [☆Function]objectGet
|  |- [☆Function]objectGetDefaultNull
|  |- [☆Function]reverseKeyValue
|  |- [☆Function]reverseEntries
|  |- [☆Function]toTree
|  |- [☆Function]flattenTree
|  |- [☆Function]findTreeParent
|  |- [☆Function]findTreeParentFromList
|  |-...
|
|- [☆]operator/
|  |- [☆Function]curry
|  |- [☆Function]equal
|  |- [☆Function]is
|  |- [☆Function]not
|  |- [☆Function]deepEqual
|  |- [☆Function]identity
|  |- [☆Function]noop
|  |- [☆Function]no
|  |- [☆Function]toRawType
|  |- [☆Function]isDefind
|  |- [☆Function]isObject
|  |- [☆Function]isPlainObject
|  |- [☆Function]isString
|  |- [☆Function]isNumber
|  |- [☆Function]isSymbol
|  |- [☆Function]isBoolean
|  |- [☆Function]isFunction
|  |- [☆Function]isRegExp
|  |- [☆Function]isPrimitive
|  |- [☆Function]isPromise
|  |- [☆Type]PlainObject
|  |-...
|
|- [☆]string/
|  |- [☆Function]translateLetter
|  |- [☆Function]translateByteLetter
|  |- [☆Function]translateFullByteLetter
|  |- [☆Function]stringLength
|  |-...
|
|- [☆]process/
|  |- [☆Function]microDelay
|  |- [☆Function]macroDelay
|  |-...
|
```
