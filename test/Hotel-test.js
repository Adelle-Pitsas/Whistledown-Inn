import chai from 'chai';
import Hotel from '../src/Hotel'
import rooms from '../src/data/Rooms-data'
import Room from '../src/Room'
import bookings from '../src/data/Bookings-data';
import Booking from '../src/Booking'
const expect = chai.expect;

describe('Hotel', () => {
let room1, room2, room3, room4, booking1, booking2, roomsData, bookingsData, newHotel, booking3, booking4, date;

beforeEach(() => {
  room1 = rooms[0]
  room2 = rooms[1]
  room3 = rooms[2]
  room4 = rooms[3]
  booking1 = bookings[0]
  booking2 = bookings[1]
  booking3 = bookings[2]
  booking4 = bookings[3]
  roomsData = [room1, room2, room3, room4]
  bookingsData = [booking1, booking2, booking3, booking4]
  newHotel = new Hotel(roomsData, bookingsData)
  date = "2022/11/23"
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

  it('should contain a empty list of rooms if there is no room data', () => {
    const emptyRoomsData = []
    const newHotel2 = new Hotel(emptyRoomsData, bookingsData)
    expect(newHotel2.allRooms).to.deep.equal([])
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

  it('should contain an empty list of bookings if there is no booking data', () => {
    const emptyBookingsData = []
    const newHotel3 = new Hotel(roomsData, emptyBookingsData)
    expect(newHotel3.allBookings).to.deep.equal([])
  })

  it('should contain a list of bookings that are instances of Booking', () => {
    expect(newHotel.allBookings[0]).to.be.an.instanceOf(Booking)
  })

  it('should have a list of unique room types', () => {
    const roomTypes = newHotel.getRoomTypes()
    expect(roomTypes).to.deep.equal(["single room", "junior suite", "residential suite"])
  })

  it('should return a room cost based on the room number', () => {
    const roomCost = newHotel.getRoomCost(12)
    expect(roomCost).to.equal(172.09)
  })

  it('should find a list of customers\' upcoming bookings', () => {
    const findBookings = newHotel.findUpcomingCustomerBookings(1, date)
    expect(findBookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6x8',
        userID: 1,
        date: '2023/01/11',
        roomNumber: 20
      }
    ])
  })

  it('should find a list of customers\ previous bookings', () => {
    const findBookings = newHotel.findPreviousCustomerBookings(1, date);
    expect(findBookings).to.deep.equal([ 
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2022/02/05',
        roomNumber: 12
      }
    ])
  })

  it('should get the amount the customer has spent on rooms', () => {
    const getAmount = newHotel.getCustomerTotalCost(1, date)
    expect(getAmount).to.equal(516.04)
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

  it('should be able to add a new booking to its list of bookings', () => {
    const bookingInfo = {
      id: "1668200085872",
      userID: 1,
      date: "2022/11/15",
      roomNumber: 1
    }
    newHotel.addNewBooking(bookingInfo)
    expect(newHotel.allBookings.reverse()[0]).to.deep.equal({
      id: "1668200085872",
      userID: 1,
      date: "2022/11/15",
      roomNumber: 1
    })
  })
});