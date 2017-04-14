import React from 'react'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'
import { createContainer }  from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'
import { Notes } from '../api/notes'

export class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }
  }

  handleTitleChange(e) {
    let title = e.target.value
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, { title })
  }

  handleBodyChange(e) {
    let body = e.target.value
    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, { body })
  }

  handleNoteDelete() {
    this.props.call('notes.remove', this.props.note._id)
    this.props.browserHistory.replace('/dashboard')
  }

  componentDidUpdate(prevProps, prevState) {
    let currentNoteId = this.props.note ? this.props.note._id : undefined
    let prevNoteId = prevProps.note ? prevProps.note._id : undefined
    
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
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
            value={ this.state.title }
            onChange={ this.handleTitleChange.bind(this) } />
          <textarea 
            ref="body" 
            name="body" 
            placeholder="Enter some text..."
            value={ this.state.body }
            onChange={ this.handleBodyChange.bind(this) } ></textarea>
          <button onClick={ this.handleNoteDelete.bind(this) }>Delete Note</button>
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
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    browserHistory,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }
}, Editor)