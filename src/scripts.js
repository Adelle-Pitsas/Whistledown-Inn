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
const datePicker = document.getElementById('datePicker')
const roomTypePicker = document.getElementById('roomTypeSelect')
const submitButton = document.getElementById('submitSearchButton')
const chooseDateError = document.getElementById('chooseDateError')
const availableRoomsContainer = document.getElementById('availableRoomsContainer')



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
      setUpCustomerDashboard()
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)

function initializeEventListeners() {
  
  bookingDropDown.addEventListener('click', toggleBookingsDisplay)

  submitButton.addEventListener('click', searchFilter)
}



// ------EVENT HANDLERS/FUNCTIONS------
function setUpCustomerDashboard() {
  getCumulativeCost();
  getRoomTypeDisplay(store.hotel.getRoomTypes());
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
    <h4 class="dropdown-header-room-number">Room Number</h4>
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

function getRoomTypeDisplay(roomTypes) {
  roomTypePicker.innerHTML = `<option value="default-select">Choose an option</option>`
  roomTypes.forEach((roomType) => {
    roomTypePicker.innerHTML += `
      <option value="${roomType}">${roomType}</option>
    `
  })
}

function searchFilter() {
  if(datePicker.value && roomTypePicker.value==='default-select') {
    displayAvailableRooms(store.hotel.getAvailableRooms(datePicker.value))
  } else if(datePicker.value && roomTypePicker !== 'default-select') {
    displayAvailableRooms(store.hotel.filterByRoomType(datePicker.value, roomTypePicker.value))
  } else {
    show(chooseDateError)
  }
}

function displayAvailableRooms(rooms) {
  availableRoomsContainer.innerHTML = ''
  rooms.forEach((room) => {
    availableRoomsContainer.innerHTML+= `
      <section class="room-card" id="roomCard">
        <figure class="picture">
          <img src="bedroomImage.png" class="bedroom-image" alt="victorian bedroom">
        </figure>
        <section class="room-details">
          <p class="room-number">Room Number: ${room.number}</p>
          <p class="room-type">${room.roomType}</p>
          <p class="bed-size">${room.bedSize}</p>
          <p class="examplenumber-of-beds">Number of beds: ${room.numBeds}</p>
          <p class="example-cost-per-night">$${room.costPerNight}</p>
        </section>
        <button class="book-room-button">BOOK ROOM</button>
      </section>
    `
  })  
}


// ------UTILITY FUNCTIONS------
function getCustomer() {
  return store.customerRepo.findCustomerByID(1)
}

function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}