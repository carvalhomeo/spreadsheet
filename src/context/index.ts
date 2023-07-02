import { Cell } from '@/model'
import { atomWithStorage } from 'jotai/utils'

export const dataAtom = atomWithStorage<Cell[][]>('data', [])
