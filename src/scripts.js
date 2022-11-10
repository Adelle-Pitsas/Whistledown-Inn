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
//------QUERY SELECTORS------
const cumulativeCost = document.getElementById('cumulativeCost')


// ------GLOBAL VARIABLES------
const store = {
  hotel: new Hotel(),
  customerRepo: new CustomerRepository(),
  bookingData: [],
  roomData: [],
  customersData: [],
  currentCustomer: new Customer()
}

// -------WINDOW LOAD FUNCTIONS------
function initializeApp() {
  getAllData()
    .then((data) => {
      store.roomData = data.roomsData
      store.bookingData = data.bookingsData;
      store.hotel = new Hotel(store.roomData, store.bookingData)
      store.customerRepo = new CustomerRepository(data.customersData)
      store.currentCustomer = getCustomer()
      dashboardSetUp()
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)


// ------EVENT HANDLERS------


//------OTHER FUNCTIONS------
function dashboardSetUp() {
  getCumulativeCost()

}

function getCumulativeCost() {
  cumulativeCost.innerText = `$${store.hotel.getCustomerTotalCost(store.currentCustomer.id)}`
}

// ------UTILITY FUNCTIONS------
function getCustomer() {
  return store.customerRepo.findCustomerByID(1)
}