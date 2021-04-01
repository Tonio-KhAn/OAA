import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CreatePosts from './createPost';

describe('<CreatePosts>', () => {

  it('passes post information', () => {
    const title = 'hello';
    const body = 'test';
    const wrapper = shallow(<CreatePosts handleSubmit={state => {
      expect(state.title).to.be.equal(title);
      expect(state.body).to.be.equal(body);
    }}/>);
    wrapper.setState({ title: 'hello', body: 'test'});
    wrapper.find('button').simulate('click');
  });
});