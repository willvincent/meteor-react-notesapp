import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { NoteListHeader } from './NoteListHeader'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    let meteorCall;
    let Session;

    beforeEach(() => {
      meteorCall = expect.createSpy()
      Session = {
        set: expect.createSpy()
      }
    })
    
    it('Should call meteorCall on click', function () {
      let wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} /> )
      
      wrapper.find('button').simulate('click')
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id)
      
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })

    it('Should not update selectedNoteId if new note is not created', function () {
      let wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} /> )
      
      wrapper.find('button').simulate('click')
      meteorCall.calls[0].arguments[1]({}, undefined)

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
      expect(Session.set).toNotHaveBeenCalled()
    })

  })
}
