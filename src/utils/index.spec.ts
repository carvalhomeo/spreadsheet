import {
  convertToCSV,
  getCellValue,
  isCellBeingReferred,
  removeExtraZeros,
  retrieveSelectedCells,
  swapCellIdsToValues,
} from '.'

describe('util functions', () => {
  it('should convert data to csv', () => {
    expect(
      convertToCSV([
        [
          { id: 'A1', value: '10', expression: '=B1+C1' },
          { id: 'B1', value: '20' },
          { id: 'C1', value: '30' },
        ],
      ]),
    ).toEqual('A,B,C\n10,20,30')
  })

  it('should retrieve selected cells from expression', () => {
    expect(retrieveSelectedCells('=A1+B2')).toEqual(['A1', 'B2'])
    expect(retrieveSelectedCells('=A1+')).toEqual(['A1'])
    expect(retrieveSelectedCells('=A1+B3*C2/A2')).toEqual([
      'A1',
      'B3',
      'C2',
      'A2',
    ])
    expect(retrieveSelectedCells('=A1+').length).toEqual(1)
  })

  it('should swap cell ids to corresponding values', () => {
    expect(
      swapCellIdsToValues('=A1+B1', [
        [
          { id: 'A1', value: '10' },
          { id: 'B1', value: '20' },
          { id: 'C1', value: '30' },
        ],
      ]),
    ).toEqual('10+20')
  })

  it('should calculate the expression value', () => {
    expect(
      getCellValue('=A1+B1', [
        [
          { id: 'A1', value: '10' },
          { id: 'B1', value: '20' },
          { id: 'C1', value: '30' },
        ],
      ]),
    ).toEqual('30')
  })

  it('should check if cell if being referrenced', () => {
    expect(
      isCellBeingReferred('B2', '=C1+A2', [
        [
          {
            id: 'A1',
            value: '10',
          },
          {
            id: 'B1',
            value: '10',
          },
          {
            id: 'C1',
            value: '10',
          },
        ],
        [
          {
            id: 'A2',
            value: '40',
            expression: '=A1+B2',
          },
          {
            id: 'B2',
            value: '40',
            expression: '=A2',
          },
          {
            id: 'C2',
            value: '20',
          },
        ],
        [
          {
            id: 'A3',
            value: '10',
          },
          {
            id: 'B3',
            value: '30',
          },
          {
            id: 'C3',
            value: '30',
          },
        ],
      ]),
    ).toBeTruthy()

    expect(
      isCellBeingReferred('B2', '=C1+A2*C3', [
        [
          {
            id: 'A1',
            value: '10',
          },
          {
            id: 'B1',
            value: '10',
          },
          {
            id: 'C1',
            value: '10',
          },
        ],
        [
          {
            id: 'A2',
            value: '40',
            expression: '=A1+B2',
          },
          {
            id: 'B2',
            value: '40',
            expression: '=A2',
          },
          {
            id: 'C2',
            value: '20',
          },
        ],
        [
          {
            id: 'A3',
            value: '10',
          },
          {
            id: 'B3',
            value: '30',
          },
          {
            id: 'C3',
            value: '30',
            expression: '=B2/A1+B2',
          },
        ],
      ]),
    ).toBeTruthy()

    expect(
      isCellBeingReferred('B2', '=A1', [
        [
          {
            id: 'A1',
            value: '10',
          },
          {
            id: 'B1',
            value: '10',
          },
          {
            id: 'C1',
            value: '10',
          },
        ],
        [
          {
            id: 'A2',
            value: '40',
            expression: '=A1+B2',
          },
          {
            id: 'B2',
            value: '40',
            expression: '=A2',
          },
          {
            id: 'C2',
            value: '20',
          },
        ],
        [
          {
            id: 'A3',
            value: '10',
          },
          {
            id: 'B3',
            value: '30',
          },
          {
            id: 'C3',
            value: '30',
            expression: '=B2/A1+B2',
          },
        ],
      ]),
    ).toBeFalsy()
  })

  it('should remove extra zeros between letter and number', () => {
    expect(removeExtraZeros('=A001+B000001')).toEqual('=A1+B1')
    expect(removeExtraZeros('=A98+B0100')).toEqual('=A98+B100')
    expect(removeExtraZeros('=A0908+B010101')).toEqual('=A908+B10101')
    expect(removeExtraZeros('=A0908/B010101')).toEqual('=A908/B10101')
    expect(removeExtraZeros('=A09-B010*C0034/A02002+C3004')).toEqual(
      '=A9-B10*C34/A2002+C3004',
    )
  })
})
