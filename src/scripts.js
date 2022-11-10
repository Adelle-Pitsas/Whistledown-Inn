// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import CustomerRepository from './CustomerRepository';
import Hotel from './Hotel';
import getAllData from './Network-requests';
import Customer from './Customer';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// ------GLOBAL VARIABLES------


const store = {
  hotelData: new Hotel(),
  customerRepo: new CustomerRepository(),
  bookingData: [],
  roomData: [],
  customersData: [],
  customer: new Customer()
}

// -------WINDOW LOAD FUNCTIONS------
function initializeApp() {
  getAllData()
    .then((data) => {
      store.roomData = data.roomsData
      store.bookingData = data.bookingsData;
      store.hotelData = new Hotel(store.roomData, store.bookingData)
      store.customerRepo = new CustomerRepository(data.customersData)
      store.customer = getCustomer()
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)


// ------EVENT HANDLERS------


// ------UTILITY FUNCTIONS------
function getCustomer() {
  return store.customerRepo.findCustomerByID(1)
}