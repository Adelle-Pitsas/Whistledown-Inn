// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import CustomerRepository from './CustomerRepository';
import Hotel from './Hotel';
import { getAllData, postBooking } from './Network-requests';
import Customer from './Customer';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//------QUERY SELECTORS------
const allContent = document.querySelector('.all-content')
const cumulativeCost = document.getElementById('cumulativeCost')
const bookingDropDown = document.getElementById('bookingDropDown')
const bookings = document.getElementById('bookings')
const dropDownArrow = document.querySelector('.dropdown-arrow')
const bookingContainer = document.getElementById('dropdownContainer')
const datePicker = document.getElementById('datePicker')
const roomTypePicker = document.getElementById('roomTypeSelect')
const submitButton = document.getElementById('submitSearchButton')
const chooseDateError = document.getElementById('chooseDateError')
const availableRooms = document.getElementById('availableRooms')
const availableRoomsHeader = document.getElementById('availableRoomsHeader')
const bookRoomSuccessPopup = document.getElementById('bookRoomSuccess')
const successDismissButton = document.getElementById('successDismissButton')
const noDateAvailablePopup = document.getElementById('noDatesAvailable')



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
      // console.log(store.bookingData)

    })
}
//------ NETWORK REQUEST FUNCTIONS------
function createNewBooking(userID, date, roomNumber) {
  console.log(date)
  postBooking(userID, date, roomNumber)
    .then((data) => {
      console.log("Is it getting here?")
      console.log(data)
      show(bookRoomSuccessPopup)
      blur(allContent)
    })
    .catch((err) => {
      console.error('CATCH ERROR', err);
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)

function initializeEventListeners() {
  
  bookingDropDown.addEventListener('click', toggleBookingsDisplay)

  submitButton.addEventListener('click', searchFilter)

}

availableRooms.addEventListener('click', bookRoom)

window.addEventListener('click', closeMessage)


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
    const date = formatDate(datePicker.value)
    displayAvailableRooms(store.hotel.getAvailableRooms(date))
  } else if(datePicker.value && roomTypePicker !== 'default-select') {
    const date = formatDate(datePicker.value)
    displayAvailableRooms(store.hotel.filterByRoomType(date, roomTypePicker.value))
  } else {
    show(chooseDateError)
  }
}

function displayAvailableRooms(rooms) {
  if(!rooms.length) {
    displayApology()
  } else {
    show(availableRoomsHeader)
    availableRooms.innerHTML = ''
    rooms.forEach((room) => {
      availableRooms.innerHTML+= `
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
          <button class="book-room-button" id="${room.number}">BOOK ROOM</button>
        </section>
      `
    }) 
  } 
}

function bookRoom(event) {
  const date = formatDate(datePicker.value)
  createNewBooking(store.currentCustomer.id, date, event.target.id)

}

function displayApology() {
  show(noDateAvailablePopup)
}


function closeMessage(event) {
  if(event.target.classList.contains('dismiss')) {
  hide(event.target.parentNode)
  removeBlur(allContent)
  }
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

function blur(element) {
  element.classList.add('blur-filter')
}

function removeBlur(element) {
  element.classList.remove('blur-filter')
}

function formatDate(date) {
  return date.split('-').join('/')
}