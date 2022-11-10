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

export default getAllData
