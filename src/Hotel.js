import Room from "./Room";
import Booking from "./Booking";

class Hotel {
  constructor(roomsData, bookingsData) {
    this.allRooms = this.makeNewRooms(roomsData) || [];
    this.allBookings = this.makeNewBookings(bookingsData) || [];
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
}

export default Hotel