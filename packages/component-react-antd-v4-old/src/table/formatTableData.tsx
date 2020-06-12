import { isPrimitive } from "@code/kit"

export interface IOrderTableItem {
  $order: number
}

export function mapTableDataWithOrder<T = IOrderTableItem> (data: T[], page: number, size: number, outputField: string = '$order') {
  if (!Array.isArray(data)) return data
  
  return data.map((d: T, i) => {
    if (isPrimitive(d)) return d
    d[outputField] = page * size + i + 1
    return d
  })
}