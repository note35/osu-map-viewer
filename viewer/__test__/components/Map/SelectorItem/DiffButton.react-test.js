import React from 'react';
import { shallow } from 'enzyme';

import DiffButton from '../../../../src/js/components/Map/Selector/SelectorItem/DiffButton';

const setup = propOverrides => {
  const props = Object.assign({
    diff_onchange: jest.fn(),
    diff: null,
    diffs: null,
  }, propOverrides)

  const wrapper = shallow(<DiffButton {...props} />)

  return {
    props,
    wrapper,
    button: wrapper.find('#diff_btn'),
  }
}

describe('Diff Button', () => {

  test('when diffs is null', () => {
    const { button } = setup({})
    button.simulate('click');
    expect(button.text()).toEqual('difficulty');
  }),

  test('when diffs is set', () => {
    const selected_diff = 'easy';
    const { props, button } = setup({
        diff: selected_diff,
        diffs: ['easy', 'normal', 'hard']
    });
    button.simulate('change', selected_diff);
    expect(props.diff_onchange).toBeCalledWith(selected_diff, selected_diff);
  })

});
