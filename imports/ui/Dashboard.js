import React from 'react'

import Editor from './Editor'
import NoteList from './NoteList'
import PrivateHeader from './PrivateHeader'

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Your Dashboard" />
      <div className="wrapper">
        <NoteList />
        <Editor />
      </div>
    </div>
  )
}

export default Dashboard