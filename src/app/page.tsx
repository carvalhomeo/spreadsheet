'use client'

import InputCell from '@/components/ui/InputCell'
import { dataAtom } from '@/context'
import { useAtom } from 'jotai'
import { Search } from 'lucide-react'
import { useEffect } from 'react'

export default function Home() {
  // const [hasError, SetHasError] = useState<boolean>(true)
  // const [editing] = useState<boolean>(false)
  const [data, setData] = useAtom(dataAtom)

  // useEffect(() => {
  //   setData([
  //     [
  //       { id: 'A1', value: '1' },
  //       { id: 'B1', value: '2' },
  //       { id: 'C1', value: '3' },
  //     ],
  //     [
  //       { id: 'A2', value: '10' },
  //       { id: 'B2', value: '20' },
  //       { id: 'C2', value: '30' },
  //     ],
  //     [
  //       { id: 'A3', value: '100' },
  //       { id: 'B3', value: '200' },
  //       { id: 'C3', value: '300' },
  //     ],
  //   ])
  // }, [setData])

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
        <table className="border-separate border-spacing-y-1">
          <thead className="h-8 bg-[#EFEFEF]">
            <tr className="border-collapse divide-x">
              <th className="font-medium first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md">
                A
              </th>
              <th className="font-medium first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md">
                B
              </th>
              <th className="font-medium first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md">
                C
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="divide-x bg-[#FAFAFA]">
                {row.map((cell) => (
                  <InputCell key={cell.id} cell={cell} />
                ))}
              </tr>
            ))}
            {/* <tr
              className={`divide-x bg-[#FAFAFA] ${
                editing ? 'shadow-all' : 'shadow-none'
              }`}
            >
              <InputCell value={1} />
              <InputCell value={200} />
              <InputCell value={3} />
            </tr> */}
            {/* <tr
              className={`divide-x bg-[#FAFAFA] ${
                editing ? 'shadow-none' : 'shadow-none'
              }`}
            >
              <InputCell value={4} />
              <InputCell value={5} />
              <InputCell value={6} />
            </tr>
            <tr
              className={`divide-x bg-[#FAFAFA] ${
                editing ? 'shadow-none' : 'shadow-none'
              }`}
            >
              <InputCell value={4} />
              <InputCell value={5} />
              <InputCell value={6} />
            </tr>
            <tr
              className={`divide-x bg-[#FAFAFA] ${
                editing ? 'shadow-none' : 'shadow-none'
              }`}
            >
              <InputCell value={4} />
              <InputCell value={5} />
              <InputCell value={6} />
            </tr> */}
          </tbody>
        </table>
      </div>
    </main>
  )
}
