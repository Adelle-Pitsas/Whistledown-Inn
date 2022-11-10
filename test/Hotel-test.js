import chai from 'chai';
import Hotel from '../src/Hotel'
import rooms from '../src/data/Rooms-data'
import Room from '../src/Room'
import bookings from '../src/data/Bookings-data';
import Booking from '../src/Booking'
const expect = chai.expect;

describe('Hotel', () => {
let room1, room2, room3, room4, booking1, booking2, roomsData, bookingsData, newHotel;

beforeEach(() => {
  room1 = rooms[0]
  room2 = rooms[1]
  room3 = rooms[2]
  room4 = rooms[3]
  booking1 = bookings[0]
  booking2 = bookings[1]
  roomsData = [room1, room2, room3, room4]
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

  it('should be able to get available rooms depending on the date', () => {
    const availableRooms = newHotel.getAvailableRooms("2022/02/05");
    expect(availableRooms).to.deep.equal([
      {
        number: 18,
        roomType: "junior suite",
        bidet: false,
        bedSize: "king",
        numBeds: 2,
        costPerNight: 496.41
      },
      {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
      },
      {
        number: 20,
        roomType: "residential suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 343.95
      }
    ])
  })

  it('should be able to filter available rooms by room type', () => {
    const filteredRooms = newHotel.filterByRoomType("2022/02/05","single room")
      expect(filteredRooms).to.deep.equal([{
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
      }])
  })
});