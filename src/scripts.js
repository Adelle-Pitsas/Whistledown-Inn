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
const bookingDropDown = document.getElementById('bookingDropDown')
const bookings = document.getElementById('bookings')
const dropDownArrow = document.querySelector('.dropdown-arrow')
const bookingContainer = document.getElementById('dropdownContainer')


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
      initializeEventListeners()
      dashboardSetUp()
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)

function initializeEventListeners() {
  
  bookingDropDown.addEventListener('click', toggleBookingsDisplay)
}



// ------EVENT HANDLERS/FUNCTIONS------
function dashboardSetUp() {
  getCumulativeCost()
}

function getCumulativeCost() {
  cumulativeCost.innerText = `$${store.hotel.getCustomerTotalCost(store.currentCustomer.id)}`
}

function toggleBookingsDisplay() {
  bookings.classList.toggle('bookings-open')
  dropDownArrow.classList.toggle('dropdown-arrow-open');
  if(bookings.classList.contains('bookings-open')) {
    bookings.ariaExpanded = 'true';
    displayCustomerBookings()
  } else {
    bookings.ariaExpanded = 'false';
    bookingContainer.innerHTML = ''
  }

}

function displayCustomerBookings() {
  bookingContainer.innerHTML = `
  <div class="bookings-header-container">
    <h4 class="dropdown-header-date">Date</h4>
    <h4 class="dropdown-header-date">Room Number</h4>
  </div>
  `;
  store.hotel.findCustomerBookings(store.currentCustomer.id).forEach((booking) => {
    bookingContainer.innerHTML += `
    <div class="booking">
      <p class="booking-date">${booking.date}</p>
      <p class="booking-room">${booking.roomNumber}</p>
    </div>
    `
  })
}


// ------UTILITY FUNCTIONS------
function getCustomer() {
  return store.customerRepo.findCustomerByID(1)
}