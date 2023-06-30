import { retrieveSelectedCells } from '.'

describe('', () => {
  it('should retrieve selected cells', () => {
    expect(retrieveSelectedCells('=A1+B2')).toEqual(['A1', 'B2'])
  })
})
