import Room from "./Room";
import Booking from "./Booking";

class Hotel {
  constructor(roomsData = [], bookingsData = []) {
    this.allRooms = this.makeNewRooms(roomsData);
    this.allBookings = this.makeNewBookings(bookingsData);
  }

  makeNewRooms(roomsData) {
    return roomsData.map((room) => {
      return new Room(room)
    })
  }

  makeNewBookings(bookingsData) {
    return bookingsData.map((booking) => {
      return new Booking(booking)
    })
  }

  getRoomTypes() {
    return this.allRooms.reduce((acc, room) => {
      if(!acc.includes(room.roomType)) {
        acc.push(room.roomType)
      }
      return acc
    }, [])
  }

  findUpcomingCustomerBookings(customerID, currentDate) {
   return this.allBookings.filter((booking) => {
      return booking.userID === customerID && booking.date >= currentDate
    })
  }

  findPreviousCustomerBookings(customerID, currentDate) {
    return this.allBookings.filter((booking) => {
      return booking.userID === customerID && booking.date <= currentDate
    })
  }


  getCustomerTotalCost(customerID, currentDate) {
    const totalBookings = []
    this.findUpcomingCustomerBookings(customerID, currentDate).forEach((booking) => {
      totalBookings.push(booking)
    })
    this.findPreviousCustomerBookings(customerID, currentDate).forEach((booking) => {
      totalBookings.push(booking)
    })
    return totalBookings.reduce((acc, booking) => {
      const foundRoom = this.allRooms.find((room) => {
        return room.number === booking.roomNumber
      })
      acc+=foundRoom.costPerNight;
      return Math.round(acc * 100)/100
    }, 0)
  }

  getAvailableRooms(date) {
    const notAvailableRooms = this.allBookings
      .filter((booking) => {
       return booking.date === date;
      })
      .map((booking) => {
        return booking.roomNumber
      })
    return this.allRooms.filter((room) => {
      return !notAvailableRooms.includes(room.number)
    })
  }

  filterByRoomType(date, roomType) {
    const availableRooms = this.getAvailableRooms(date);
    return availableRooms.filter((room) => {
      return room.roomType === roomType
    })
  }

  addNewBooking(bookingInfo) {
    const newBooking = new Booking(bookingInfo)
    this.allBookings.push(newBooking)
  }
}

export default Hotel