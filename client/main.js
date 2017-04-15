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
  Session.set('navOpen', false)
  
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
})

Tracker.autorun(() => {
  let navOpen = Session.get('navOpen')
  document.body.classList.toggle('nav-open', navOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('navOpen', false)
  ReactDOM.render(routes, document.getElementById('app'))
})