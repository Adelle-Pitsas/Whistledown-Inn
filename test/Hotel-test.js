import chai from 'chai';
import Hotel from '../src/Hotel'
import rooms from '../src/data/Rooms-data'
import Room from '../src/Room'
import bookings from '../src/data/Bookings-data';
import Booking from '../src/Booking'
const expect = chai.expect;

describe('Hotel', () => {
let room1, room2, booking1, booking2, roomsData, bookingsData, newHotel;

beforeEach(() => {
  room1 = rooms[0]
  room2 = rooms[1]
  booking1 = bookings[0]
  booking2 = bookings[1]
  roomsData = [room1, room2]
  bookingsData = [booking1, booking2]
  newHotel = new Hotel(roomsData, bookingsData)
})

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(newHotel).to.be.an.instanceOf(Hotel)
  })

  it('should contain a list of rooms', () => {
    expect(newHotel.allRooms[0]).to.deep.equal({
      number: 12,
      roomType: "single room",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 172.09
      })
  })

  it('should contain a list of rooms that are instances of Room', () => {
    expect(newHotel.allRooms[0]).to.be.an.instanceOf(Room)
  })

  it('should contain a list of bookings', () => {
    expect(newHotel.allBookings[0]).to.deep.equal({
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12
      })
  })

  it('should contain a list of bookings that are instances of Booking', () => {
    expect(newHotel.allBookings[0]).to.be.an.instanceOf(Booking)
  })
});