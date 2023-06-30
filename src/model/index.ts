export interface Cell {
  id: string
  value: string
  expression?: string
}

export interface Row {
  [x: string]: Cell[]
}
