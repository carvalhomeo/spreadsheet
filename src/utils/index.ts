import { Cell } from '@/model'

export function convertToCSV(object: {}) {}

export function retrieveSelectedCells(selectedCells: string) {
  return selectedCells.replace('=', '').split(/[+\-*/]/g)
}

export function swapCellIdsToValues(calculation: string, data: Cell[][]) {
  const selectedCells = retrieveSelectedCells(calculation)
  let finalCalculationStr = calculation

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

export function getCellValue(value: string, data: Cell[][]): string {
  if (value.startsWith('=')) {
    const finalCalculationStr = swapCellIdsToValues(value, data)
    // eslint-disable-next-line no-eval
    return eval(finalCalculationStr)
  } else {
    return value
  }
}
