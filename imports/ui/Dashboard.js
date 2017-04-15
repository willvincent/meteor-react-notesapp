import React from 'react'

import Editor from './Editor'
import NoteList from './NoteList'
import PrivateHeader from './PrivateHeader'

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Notes" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList />
        </div>
        <div className="page-content__main">
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default Dashboard