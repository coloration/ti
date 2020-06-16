import { isPrimitive } from "@code/kit"

export interface IOrderTableItem {
  $order: number
}

export function tableMapperWithOrder<T = IOrderTableItem> (option?: { page: number, pageSize: number, field: string }, data?: any[]) : T[] {
  if (!Array.isArray(data)) return []

  const opt = Object.assign({
    page: 1, 
    pageSize: 10, 
    field: '$order'
  }, option)
  
  return data.map((d: T, i) => {
    if (isPrimitive(d)) return d
    d[opt.field] = opt.page * opt.pageSize + i + 1
    return d
  })
}