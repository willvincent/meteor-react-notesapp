import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('users', function () {

    it('Should allow valid email addresses', function () {
      let testUser = {
        emails: [
          { address: 'valid@email.com' }
        ]
      }

      let result = validateNewUser(testUser)
      expect(result).toBe(true)
    })

    it('Should reject invalid email addresses', function () {
      let testUser = {
        emails: [
          { address: 'invalid-email' }
        ]
      }

      expect(() => {
        validateNewUser(testUser)
      }).toThrow()
    })
    
  })
}