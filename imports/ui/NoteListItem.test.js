import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import NoteListItem from './NoteListItem'

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('Should render title and timestamp', function () {
      let title = 'Test title'
      let updatedAt = 1492192496443
      let wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> )

      expect(wrapper.find('h5').text()).toBe(title)
      expect(wrapper.find('p').text()).toBe('4/14/17')
    })

    it('Should display default title when created without a title', function () {
      let updatedAt = 1492192496443
      let wrapper = mount( <NoteListItem note={{ updatedAt }} /> )

      expect(wrapper.find('h5').text()).toBe('Untitled note')
      expect(wrapper.find('p').text()).toBe('4/14/17')
    })
    
  })
}
