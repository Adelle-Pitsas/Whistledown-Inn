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
const upcomingBookingDropDown = document.getElementById('upcomingBookingDropDown')
const upcomingBookings = document.getElementById('upcomingBookings')
const upcomingDropDownArrow = document.querySelector('.upcoming-dropdown-arrow')
const upcomingBookingContainer = document.getElementById('upcomingDropdownContainer')
const previousBookingDropDown = document.getElementById('previousBookingDropDown')
const previousBookings = document.getElementById('previousBookings')
const previousDropDownArrow = document.querySelector('.previous-dropdown-arrow')
const previousBookingContainer = document.getElementById('previousDropdownContainer')


const allContent = document.querySelector('.all-content')
const cumulativeCost = document.getElementById('cumulativeCost')
const datePicker = document.getElementById('datePicker')
const roomTypePicker = document.getElementById('roomTypeSelect')
const submitButton = document.getElementById('submitSearchButton')
const chooseDateError = document.getElementById('chooseDateError')
const availableRooms = document.getElementById('availableRooms')
const availableRoomsHeader = document.getElementById('availableRoomsHeader')
const bookRoomSuccessPopup = document.getElementById('bookRoomSuccess')
const noDateAvailablePopup = document.getElementById('noDatesAvailable')
const networkErrorPopup =document.getElementById('networkError')



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
      console.log(data.newBooking)
      store.hotel.addNewBooking(data.newBooking)
      show(bookRoomSuccessPopup)
      blur(allContent)
    })
    .catch((err) => {
      console.error('CATCH ERROR', err);
      show(networkErrorPopup)
      blur(allContent)
    })
}


// ------EVENT LISTENERS------
window.addEventListener('load', initializeApp)

function initializeEventListeners() {
  
  upcomingBookingDropDown.addEventListener('click', toggleUpcomingBookingsDisplay)

  submitButton.addEventListener('click', searchFilter)

  previousBookingDropDown.addEventListener('click', togglePreviousBookingsDisplay)

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

function toggleUpcomingBookingsDisplay() {
  upcomingBookings.classList.toggle('bookings-open')
  upcomingDropDownArrow.classList.toggle('upcoming-dropdown-arrow-open');
  if(upcomingBookings.classList.contains('bookings-open')) {
    upcomingBookings.ariaExpanded = 'true';
    displayCustomerBookings(upcomingBookingContainer)
  } else {
    upcomingBookings.ariaExpanded = 'false';
    upcomingBookingContainer.innerHTML = ''
  }
}

function togglePreviousBookingsDisplay() {
  previousBookings.classList.toggle('bookings-open');
  previousDropDownArrow.classList.toggle('previous-dropdown-arrow-open');
  if(previousBookings.classList.contains('bookings-open')) {
    previousBookings.ariaExpanded = 'true';
    displayCustomerBookings(previousBookingContainer)
  } else {
    previousBookings.ariaExpanded = 'false';
    previousBookingContainer.innerHTML = ''
  }
}


function displayCustomerBookings(containerElement) {
  containerElement.innerHTML = `
  <div class="bookings-header-container">
    <h4 class="dropdown-header-date">Date</h4>
    <h4 class="dropdown-header-room-number">Room Number</h4>
  </div>
  `;
  store.hotel.findCustomerBookings(store.currentCustomer.id).forEach((booking) => {
    upcomingBookingContainer.innerHTML += `
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