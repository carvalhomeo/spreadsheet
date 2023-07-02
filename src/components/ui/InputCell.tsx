import { dataAtom } from '@/context'
import { Cell } from '@/model'
import { getCellValue, isCellBeingReferred, removeExtraZeros } from '@/utils'
import { useAtom } from 'jotai'
import { Edit2 } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface InputCellProps {
  cell: Cell
  onEdit: () => void
  onBlur: () => void
}

const InputCell = ({
  cell: { id, value, expression },
  onEdit,
  onBlur,
}: InputCellProps) => {
  const [data, setData] = useAtom(dataAtom)
  const [isEditing, setIsEditing] = useState<boolean>()
  const [valueCell, setValueCell] = useState<string>(value)
  const [hasError, setHasError] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) inputRef?.current?.focus()
  }, [isEditing])

  useEffect(() => {
    data.forEach((row) =>
      row.forEach((cell) => {
        if (cell.id === id) {
          if (expression) {
            const val = getCellValue(expression, data)
            if (val === '') {
              setValueCell('')
              setHasError(true)
            } else {
              setValueCell(val)
              setHasError(false)
            }
          } else {
            setHasError(false)
          }
        }
      }),
    )
  }, [data, expression, id, value])

  const handleEdit = () => {
    setIsEditing((oldState) => !oldState)
    onEdit()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueCell(event.target.value)
  }

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing((oldState) => !oldState)

    const noZerosExpression = removeExtraZeros(event.target.value)

    if (isCellBeingReferred(id, noZerosExpression, data)) {
      setHasError(true)
    } else {
      setData(
        data.map((row) =>
          row.map((cell) => {
            const cellValue = getCellValue(noZerosExpression, data)
            if (cell.id === id) {
              return {
                id,
                value: cellValue,
                expression: valueCell.startsWith('=')
                  ? removeExtraZeros(valueCell)
                  : undefined,
              }
            } else if (
              cell.expression &&
              isCellBeingReferred(id, cell.expression, data)
            ) {
              return {
                ...cell,
                value: getCellValue(
                  cell.expression.replace(id, cellValue),
                  data,
                ),
              }
            }

            return cell
          }),
        ),
      )
    }

    onBlur()
  }

  const handleFocus = () => {
    if (expression) setValueCell(expression)
  }

  return (
    <td
      className={`${
        hasError
          ? 'last:border-r-none border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-[#AF3434] bg-[#F21212] bg-opacity-5 first:border-l-[1px]'
          : ''
      } h-8 p-1 first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md`}
      data-testid={`cell-${id}`}
    >
      <div className="relative flex flex-row items-center">
        <input
          type="text"
          disabled={!isEditing}
          className="basis-full bg-transparent text-center font-normal outline-none"
          onBlur={handleBlur}
          onChange={handleChange}
          value={valueCell}
          onFocus={handleFocus}
          ref={inputRef}
          data-testid={`input-cell-${id}`}
        />

        <button
          type="button"
          className="absolute right-0"
          onClick={handleEdit}
          data-testid={`edit-btn-${id}`}
        >
          <Edit2 className="h-3 w-3" />
        </button>
      </div>
    </td>
  )
}

export default InputCell
