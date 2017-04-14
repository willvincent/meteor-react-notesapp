import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'

import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'


export const NoteList = (props) => {
  let renderNoteListItems = () => {
    if (props.notes.length === 0) {
      return <NoteListEmptyItem />
    }
    return props.notes.map((note) => <NoteListItem key={ note._id } note={ note } /> )
  }
  return (
    <div>
      <NoteListHeader />
      { renderNoteListItems() }
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch()
  }
}, NoteList)