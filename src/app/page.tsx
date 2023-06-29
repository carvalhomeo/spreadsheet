import { Search } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center pt-16">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Your Personal Staking Calculator</h1>
        <div className="flex w-[615px] flex-row gap-2 bg-[#F3F3F3] p-2">
          <Search className="text-gray-400" />
          <input
            type="search"
            placeholder="Type a search query to filter"
            className="w-full bg-transparent font-normal outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <table>
          <th>
            <tr>
              <td></td>
            </tr>
          </th>
        </table>
      </div>
    </main>
  )
}
