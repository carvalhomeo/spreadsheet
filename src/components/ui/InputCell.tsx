/* eslint-disable no-eval */
import { dataAtom } from '@/context'
import { Cell } from '@/model'
import { getCellValue } from '@/utils'
import { useAtom } from 'jotai'
import { Edit2 } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface InputCellProps {
  cell: Cell
  hasError?: boolean
  editing?: boolean
}

const InputCell = ({
  cell: { id, value, expression },
  hasError = false,
  editing = true,
}: InputCellProps) => {
  const [data, setData] = useAtom(dataAtom)
  const [isEditing, setIsEditing] = useState<boolean>()
  const [valueCell, setValueCell] = useState<string>(value)
  const inputRef = useRef<HTMLInputElement>(null)
  // const [selectableMode, setSelectableMode] = useState<boolean>(false)

  useEffect(() => {
    if (isEditing) inputRef?.current?.focus()
  }, [isEditing])

  const handleEdit = () => {
    setIsEditing((oldState) => !oldState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '=') {
      // trigger selectable mode
      console.log('is trying to add')
    }
    setValueCell(event.target.value)
  }

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setValueCell(getCellValue(event.target.value, data))

    setIsEditing((oldState) => !oldState)

    setData(
      data.map((row) =>
        row.map((cell) => {
          if (cell.id === id) {
            return {
              id,
              value: getCellValue(event.target.value, data),
              expression: valueCell.startsWith('=') ? valueCell : undefined,
            }
          }

          return cell
        }),
      ),
    )
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
    >
      <div className="relative flex flex-row items-center">
        <input
          type="text"
          disabled={!isEditing}
          className="basis-full text-center font-normal outline-none"
          onBlur={handleBlur}
          onChange={handleChange}
          value={valueCell}
          onFocus={handleFocus}
          ref={inputRef}
        />

        <button type="button" className="absolute right-0" onClick={handleEdit}>
          <Edit2 className="h-3 w-3" />
        </button>
      </div>
    </td>
  )
}

export default InputCell
