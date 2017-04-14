import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { NoteList } from './NoteList'

const notes = [
  {
    _id: 'testNote1',
    title: 'Test title 1',
    body: '',
    updatedAt: 0,
    userId: 'testUser1'
  },
  {
    _id: 'testNote2',
    title: '',
    body: 'Test body text',
    updatedAt: 0,
    userId: 'testUser2'
  }
]

if (Meteor.isClient) {
  describe('NoteList', function () {

    it('Should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={ notes } />)

      expect(wrapper.find('NoteListItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })

    it('Should render NoteListEmptyItem if there are no notes', function () {
      const wrapper = mount(<NoteList notes={ [] } />)

      expect(wrapper.find('NoteListItem').length).toBe(0)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
    })

  })
}