import { Cell } from '@/model'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const dataAtom = atomWithStorage<Cell[][]>('data', [])

export const selectedCells = atom([])
