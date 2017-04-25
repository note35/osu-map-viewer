import reducer from '../../src/js/reducers/selectorReducer';


describe('Selector Reducer', () => {

  it('has default values', () => {

    expect(reducer(undefined, { type: 'unexpected' })).toEqual({
      update: false,
      text: "",
      mode: "Standard",
      diff: "",
      prediff: "",
      loading: false,
    });

  })

})
