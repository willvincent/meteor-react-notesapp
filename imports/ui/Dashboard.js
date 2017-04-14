import React from 'react'

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Your Dashboard" />
      <div className="wrapper">
        <NoteList />
      </div>
    </div>
  )
}

export default Dashboard