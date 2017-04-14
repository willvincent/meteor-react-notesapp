import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom'

import { routes, onAuthChange } from '../imports/routes/routes'
import '../imports/startup/simple-schema-config'

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId()
  let currentPagePrivacy = Session.get('currentPagePrivacy')

  onAuthChange(isAuthenticated, currentPagePrivacy)
})

Tracker.autorun(() => {
  let selectedNoteId = Session.get('selectedNoteId')
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  ReactDOM.render(routes, document.getElementById('app'))
})