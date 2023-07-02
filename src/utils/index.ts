import { Cell } from '@/model'

/**
 * @description converts the data table information into csv format
 *
 * @param data
 * @returns string
 */
export function convertToCSV(data: Cell[][]): string {
  const headers = data[0]?.map((obj) => obj.id.charAt(0))
  const rows = data?.map((row) => row.map((obj) => obj.value)?.join(','))
  const csv = [headers?.join(','), ...rows]?.join('\n')

  return csv
}

/**
 * @description given an expression returns an array of the cells used
 *
 * @param expression
 * @returns string[]
 */
export function retrieveSelectedCells(expression: string): string[] {
  const variablePattern = /[A-Za-z]+\d+/g
  const matches = expression.match(variablePattern)

  return matches || []
}

/**
 * @description swaps cell references to values in the expression
 *
 * @param expression
 * @param data
 * @returns string
 */
export function swapCellIdsToValues(
  expression: string,
  data: Cell[][],
): string {
  const selectedCells = retrieveSelectedCells(expression)
  let finalCalculationStr = expression

  selectedCells.forEach((selectedCell) =>
    data.forEach((row) =>
      row.forEach((cell) => {
        const value = cell.id === selectedCell ? cell.value : undefined
        if (value) {
          finalCalculationStr = finalCalculationStr.replace(selectedCell, value)
        }
      }),
    ),
  )

  return finalCalculationStr.replace('=', '')
}

/**
 * @description calculates the expression value if cell starts with "="
 *
 * @param expression
 * @param data
 * @returns string
 */
export function getCellValue(expression: string, data: Cell[][]): string {
  if (expression.startsWith('=')) {
    const finalCalculationStr = swapCellIdsToValues(expression, data)

    try {
      // eslint-disable-next-line no-eval
      return eval(finalCalculationStr).toString()
    } catch (error) {
      return ''
    }
  }

  return expression
}

/**
 * @description checks whether the current cell is referrencing itself or if any of the cells in the expression references the current cell
 *
 * @param id
 * @param cells
 * @param data
 * @returns boolean
 */
export function isCellBeingReferred(
  id: string,
  expression: string,
  data: Cell[][],
): boolean {
  const selectedCells = retrieveSelectedCells(expression)

  if (selectedCells.includes(id)) {
    return true
  }

  const isBeingReferred = selectedCells.some((selectedCell) => {
    return data.some((row) => {
      return row.some((cell) => {
        return cell.id === selectedCell && cell.expression?.includes(id)
      })
    })
  })

  return isBeingReferred
}

/**
 *
 * @param input
 * @returns string
 */
export function removeExtraZeros(input: string): string {
  return input.replace(
    /([A-Z])(0+)(?=\d|$)|(\+)(0+)(?=[A-Z]|\+|$)/g,
    (_, letter, zeros, plus, zerosBetween) => {
      if (zeros) {
        const trimmedZeros = zeros.replace(/^0+/, '')
        return letter + trimmedZeros
      }
      if (zerosBetween) {
        return plus + Number(zerosBetween).toString()
      }
      return _
    },
  )
}
