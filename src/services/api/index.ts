import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'text/csv',
  },
})

export const saveData = async (blob: string) => {
  const { data } = await api.post<{
    id: string
    status: string
    done_at: string
  }>('/save', { data: blob })

  return data
}

export const getStatus = async (id: string) => {
  const { data } = await api.get<{ status: string }>(`/get-status?id=${id}`)

  return data
}
