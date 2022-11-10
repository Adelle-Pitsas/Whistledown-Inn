import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking'
import bookings from '../src/data/Bookings-data'

describe('Booking', () => {
  let booking1, booking2, newBooking1, newBooking2

  beforeEach(() => {
    booking1 = bookings[0];
    booking2 = bookings[1];
    newBooking1 = new Booking(booking1)
    newBooking2 = new Booking(booking2)
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(newBooking1).to.be.an.instanceOf(Booking)
  })

  it('should have an id', () => {
    expect(newBooking1.id).to.equal("5fwrgu4i7k55hl6t8");
  })

  it('should have the user\'s ID', () => {
    expect(newBooking1.userID).to.equal(1)
  })

  it('should have a date', () => {
    expect(newBooking1.date).to.equal("2022/02/05")
  })

  it('should have a room number', () => {
    expect(newBooking1.roomNumber).to.equal(12)
  })
});