import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function () {

    let noteOne = {
      _id: 'testNoteId1',
      title: 'Test note',
      body: 'This is a test note',
      updatedAt: 0,
      userId: 'testUserId1'
    }

    let noteTwo = {
      _id: 'testNoteId2',
      title: 'Test note 2',
      body: 'This is another test note',
      updatedAt: 0,
      userId: 'testUserId2'
    }

    beforeEach(function () {
      Notes.remove({})
      Notes.insert(noteOne)
      Notes.insert(noteTwo)
    })

    it('Should insert a new note', function () {
      let userId = noteOne.userId
      let _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

      expect(Notes.findOne({ _id, userId })).toExist()
    })

    it('Should not insert a note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']()
      }).toThrow()
    })

    it('Should remove a note', function () {
      let userId = noteOne.userId
      let _id = noteOne._id
      Meteor.server.method_handlers['notes.remove'].apply({ userId }, [ _id ])

      expect(Notes.findOne({ _id })).toNotExist()
    })

    it('Should not remove a note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).toThrow()
    })

    it('Should not remove a note without a valid note id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId })
      }).toThrow()
    })

    it('Should update a note', function () {
      let title = 'Updated note title'
      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [
        noteOne._id,
        { title }
      ])

      let note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title, 
        body: noteOne.body
      })
    })

    it('Should not update note if user was not the creator', function () {
      let title = 'Updated note title'
      Meteor.server.method_handlers['notes.update'].apply({ userId: 'someone-else' }, [
        noteOne._id,
        { title }
      ])

      let note = Notes.findOne(noteOne._id);
      
      expect(note).toInclude(noteOne)
    })

    it('Should not allow an update to include excess data', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [
          noteOne._id,
          { foo: 'bar' }
        ])
      }).toThrow()
    })

    it('Should not update a note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [
          noteOne._id,
          { title }
        ])
      }).toThrow()
    })

    it('Should not update a note without a valid note id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [
          noteOne._id,
          { title }
        ])
      }).toThrow()
    })

    it('Should return a users notes', function () {
      let notes = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId }).fetch()

      expect(notes.length).toBe(1)
      expect(notes[0]).toEqual(noteOne)
    })

    it('Should not return any notes if a user has none', function () {
      let notes = Meteor.server.publish_handlers.notes.apply({ userId: 'fake-user-id' }).fetch()

      expect(notes.length).toBe(0)
    })

  })
}