import reducer from '../../src/js/reducers/mapsetReducer';


describe('Mapset Reducer', () => {

  it('has default values', () => {

    expect(reducer(undefined, { type: 'unexpected' })).toEqual({
      fetching: false,
      fetched: false,
      mapset: null,
      error: null,
    });

  })

})
