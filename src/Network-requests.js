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
  getCustomer: (id) => {
    return fetchData(`http://localhost:3001/api/v1/customers/${id}`)
  },
 getAllRooms: () => {
    return fetchData('http://localhost:3001/api/v1/rooms')
 },
  getAllBookings: () => {
    return fetchData('http://localhost:3001/api/v1/bookings')
  }
}

function getAllData(id) {
  return Promise.all([
    networkRequests.getCustomer(id),
    networkRequests.getAllRooms(),
    networkRequests.getAllBookings()
  ])
  .then((data) => {
    return {
    customerData: data[0],
    roomsData: data[1].rooms,
    bookingsData: data[2].bookings
    }
  })
} 

const postURL = "http://localhost:3001/api/v1/bookings"

function postBooking(userID, date, roomNumber) {
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
