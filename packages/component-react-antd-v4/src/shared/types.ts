export enum TablePageSize {
  p5 = 5,
  p10 = 10,
  p20 = 20,
  p30 = 30,
  p40 = 40,
  p50 = 50
}

export const TABLE_DEFAULT = '--'

export interface IPlainOption<T = any> {
  name: string,
  value: T,
  disabled?: boolean
}