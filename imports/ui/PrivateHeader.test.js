import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { PrivateHeader } from './PrivateHeader'

if (Meteor.isClient) {
  describe('PrivateHeader', function () {

    it('Should set button text to logout', function () {
      let wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}} /> )

      expect(wrapper.find('button').text()).toBe('Logout')
    })

    it('Should use title prop as h1 text', function () {
      let title = 'This is the test title we are looking for'
      let wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}} /> )

      expect(wrapper.find('h1').text()).toBe(title)
    })

    it('Should call handleLogout when logout button is clicked', function () {
      let spy = expect.createSpy()
      let wrapper = mount( <PrivateHeader title={'title'} handleLogout={spy} /> )
      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalled()
    })
    
  })
}