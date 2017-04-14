import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Login } from './Login'

if (Meteor.isClient) {
  describe('Login', function () {

    it('Should show error messages', function () {
      let error = 'This is not working'
      let wrapper = mount( <Login loginWithPassword={() => {}} /> )

      wrapper.setState({ error })
      expect(wrapper.find('p').text()).toBe(error)
      wrapper.setState({ error: '' })
      expect(wrapper.find('p').length).toBe(0)
    })

    it('Should call loginWithPassword with the form data', function () {
      let email = 'test@test.com'
      let password = 'testpassword'
      let spy = expect.createSpy();
      let wrapper = mount( <Login loginWithPassword={spy} /> )

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')
      expect(spy.calls[0].arguments[0]).toEqual({ email })
      expect(spy.calls[0].arguments[1]).toEqual(password)
    })

    it('Should set loginWithPassword callback errors', function () {
      let spy = expect.createSpy()
      let wrapper = mount( <Login loginWithPassword={spy} /> )

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[2]({})
      expect(wrapper.state('error').length).toNotBe(0)
      spy.calls[0].arguments[2]()
      expect(wrapper.state('error').length).toBe(0)
    })
    
  })
}