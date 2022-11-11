

// ------- GET Requests -------

const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      if(!response.ok) {
        throw new Error(
          `${response.status} at endpoint ${response.url}`
        )
      }
      return response.json();
    })
}

const networkRequests = {
  getAllCustomers: () => {
    return fetchData('http://localhost:3001/api/v1/customers')
  },
 getAllRooms: () => {
    return fetchData('http://localhost:3001/api/v1/rooms')
 },
  getAllBookings: () => {
    return fetchData('http://localhost:3001/api/v1/bookings')
  }
}

function getAllData() {
  return Promise.all([
    networkRequests.getAllCustomers(),
    networkRequests.getAllRooms(),
    networkRequests.getAllBookings()
  ])
  .then((data) => {
    return {
    customersData: data[0].customers,
    roomsData: data[1].rooms,
    bookingsData: data[2].bookings
    }
  })
  .catch((err) => console.error(err))
} 

const postURL = "http://localhost:3001/api/v1/bookings"

function postBooking(userID, date, roomNumber) {
  // console.log(userID.toString())
  // console.log(date)
  // console.log(Number(roomNumber))
  // console.log(typeof roomNumber)
  // const newNumber = Number
  const bookingPost = {
    "userID": userID,
    "date": date,
    "roomNumber": Number(roomNumber)
  }
  return fetch(postURL, {
      method: 'POST',
      body: JSON.stringify(bookingPost),
      headers: { 
        'Content-Type': 'application/json' 
      }
  })
  .then(response => errorHandling(response))
}
  
  
function errorHandling(response) {
    if (!response.ok) {
      throw new Error(`Sorry! Something went wrong!`);
    }
    return response.json();
}

export { getAllData, postBooking }
