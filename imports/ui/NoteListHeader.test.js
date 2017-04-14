import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { NoteListHeader } from './NoteListHeader'

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    
    it('Should call meteorCall on click', function () {
      let spy = expect.createSpy()
      let wrapper = mount( <NoteListHeader meteorCall={spy}/> )
      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalledWith('notes.insert')
    })

  })
}
