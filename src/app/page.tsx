'use client'

import InputCell from '@/components/ui/InputCell'
import { dataAtom } from '@/context'
import { useInterval } from '@/hooks/useInterval'
import { getStatus, saveData } from '@/services/api'
import { convertToCSV } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { MinusCircle, PlusCircle, Search } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [error, setError] = useState<boolean>(false)
  const [editing, setIsEditing] = useState<number | undefined>(undefined)
  const [data, setData] = useAtom(dataAtom)
  const { mutate } = useMutation({
    mutationFn: saveData,
    onSuccess: (data) => {
      if (data.status === 'IN_PROGRESS') {
        const sec = new Date(data.done_at).getTime() - new Date().getTime()

        setTimeout(() => {
          getStatus(data.id)
        }, sec + 1)
      }
      setError(false)
    },
    onError: () => {
      setError(true)
    },
  })
  const cols = ['A', 'B', 'C']

  useInterval(() => {
    mutate(convertToCSV(data))
  }, 20000)

  const handleAddRow = () => {
    setData((oldState) => [
      ...oldState,
      [
        { id: `A${oldState.length + 1}`, value: '' },
        { id: `B${oldState.length + 1}`, value: '' },
        { id: `C${oldState.length + 1}`, value: '' },
      ],
    ])
  }

  const handleRemoveLastRow = () => {
    setData((oldState) => {
      const [, ...rest] = oldState.reverse()
      return rest.reverse()
    })
  }

  return (
    <main className="flex h-screen flex-col items-center gap-4 pt-16">
      <div className="flex w-[615px] flex-col">
        <h1 className="text-2xl font-bold">Your Personal Staking Calculator</h1>
        <div className="flex flex-row gap-2 rounded-md bg-[#F3F3F3] p-2">
          <Search className="text-gray-400" />
          <input
            type="search"
            placeholder="Type a search query to filter"
            className="w-full bg-transparent font-normal outline-none"
          />
        </div>
      </div>

      <div className="flex w-[615px] flex-col">
        <table
          className={`${
            error
              ? 'rounded-md border-[1px] border-[#AF3434] border-opacity-100'
              : 'border-opacity-0'
          } border-separate border-spacing-y-1 transform transition-all ease-in`}
        >
          <thead className="h-8 bg-[#EFEFEF]">
            <tr className="border-collapse divide-x">
              {cols.map((col) => (
                <th
                  key={col}
                  className="font-medium first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-testid="table-rows">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`divide-x bg-[#FAFAFA] ${
                  editing === index ? 'shadow-all' : 'shadow-none'
                }`}
              >
                {row.map((cell) => (
                  <InputCell
                    key={cell.id}
                    cell={cell}
                    onEdit={() => setIsEditing(index)}
                    onBlur={() => setIsEditing(undefined)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={handleAddRow}
            data-testid="add-row-btn"
          >
            <PlusCircle className="absolute -left-8 top-1 text-gray-400" />
          </button>

          <div className="absolute -left-2 top-4 h-[1px] w-[633px] bg-gray-400" />

          <button
            type="button"
            onClick={handleRemoveLastRow}
            data-testid="remove-row-btn"
          >
            <MinusCircle className="absolute left-[625px] top-1 text-gray-400" />
          </button>
        </div>
      </div>
    </main>
  )
}
