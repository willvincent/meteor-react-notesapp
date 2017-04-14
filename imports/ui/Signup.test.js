import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Signup } from './Signup'

if (Meteor.isClient) {
  describe('Signup', function () {

    it('Should show error messages', function () {
      let error = 'This is not working'
      let wrapper = mount( <Signup createUser={() => {}} /> )

      wrapper.setState({ error })
      expect(wrapper.find('p').text()).toBe(error)
      wrapper.setState({ error: '' })
      expect(wrapper.find('p').length).toBe(0)
    })

    it('Should call createUser with the form data', function () {
      let email = 'test@test.com'
      let password = 'testpassword'
      let spy = expect.createSpy();
      let wrapper = mount( <Signup createUser={spy} /> )

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')
      expect(spy.calls[0].arguments[0]).toEqual({ email, password })
    })

    it('Should set an error if password is shorter than 8 characters', function () {
      let email = 'test@test.com'
      let password = '12345'
      let spy = expect.createSpy();
      let wrapper = mount( <Signup createUser={spy} /> )

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')
      expect(wrapper.state('error').length).toBeGreaterThan(0)
      wrapper.setState({ error: '' })
    })

    it('Should set createUser callback errors', function () {
      let password = 'testpassword'
      let reason = 'test-error-message'
      let spy = expect.createSpy()
      let wrapper = mount( <Signup createUser={spy} /> )
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[1]({ reason })
      expect(wrapper.state('error')).toEqual(reason)
      
      spy.calls[0].arguments[1]()
      expect(wrapper.state('error').length).toBe(0)
    })
    
  })
}