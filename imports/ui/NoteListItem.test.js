import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { notes } from '../fixtures/fixtures'
import { NoteListItem } from './NoteListItem'

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      }
    })

    it('Should render title and timestamp', function () {
      let wrapper = mount( <NoteListItem note={notes[0]} Session={Session} /> )

      expect(wrapper.find('h5').text()).toBe(notes[0].title)
      expect(wrapper.find('p').text()).toBe('4/14/17')
    })

    it('Should display default title when created without a title', function () {
      let wrapper = mount( <NoteListItem note={notes[1]} Session={Session} /> )

      expect(wrapper.find('h5').text()).toBe('Untitled note')
      expect(wrapper.find('p').text()).toBe('4/14/17')
    })

    it('Should call Session.set() when clicked', function () {
      let wrapper = mount( <NoteListItem note={notes[0]} Session={Session} /> )

      wrapper.find('NoteListItem').simulate('click')
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })
    
  })
}
