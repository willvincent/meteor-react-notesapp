import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer }  from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'
import { Notes } from '../api/notes'

export class Editor extends React.Component {
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, { title: e.target.value })
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, { body: e.target.value })
  }
  render () {
    if (this.props.note) {
      return (
        <div>
          <input 
            type="text" 
            ref="title" 
            name="title" 
            placeholder="Untitled note"
            value={ this.props.note.title }
            onChange={ this.handleTitleChange.bind(this) } />
          <textarea 
            ref="body" 
            name="body" 
            placeholder="Enter some text..."
            value={ this.props.note.body }
            onChange={ this.handleBodyChange.bind(this) } ></textarea>
          <button>Delete Note</button>
        </div>
      )
    } 

    return (
      <p>
        { this.props.selectedNoteId ? 'Note note found.' : 'Pick or create a note to get started.' }
      </p>
    )
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string.isRequired,
  note: PropTypes.object
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }
}, Editor)