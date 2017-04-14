import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequied
}

export default NoteListItem