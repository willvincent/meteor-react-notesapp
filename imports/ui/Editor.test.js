import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Editor } from './Editor'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('Editor', function () {

    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        replace: expect.createSpy()
      }
    })

    it('Should display a message when no note is selected', function () {
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} />)
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.')
    })

    it('Should display a message when an invalid note id is set', function () {
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId='testId' />)
      expect(wrapper.find('p').text()).toBe('Note not found.')
    })

    it('Should remove a note and redirect when delete button is clicked', function () {
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)

      wrapper.find('button').simulate('click')

      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
      expect(browserHistory.replace).toHaveBeenCalledWith('/dashboard')
    })

    it('Should update the note title on input change', function () {
      let newTitle = 'New title'
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      })

      expect(wrapper.state('title')).toBe(newTitle)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle})
    })

    it('Should update the note body on textarea change', function () {
      let newBody = 'New body'
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      })

      expect(wrapper.state('body')).toBe(newBody)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody})
    })

    it('Should fill state when note prop is set', function () {
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} />)
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      })

      expect(wrapper.state('title')).toBe(notes[0].title)
      expect(wrapper.state('body')).toBe(notes[0].body)
    })

    it('Should not fill state when note prop is not set', function () {
      let wrapper = mount(<Editor call={call} browserHistory={browserHistory} />)
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      })

      expect(wrapper.state('title')).toBe('')
      expect(wrapper.state('body')).toBe('')
    })


  })
} 