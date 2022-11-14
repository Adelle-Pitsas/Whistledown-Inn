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
import './images/BrigertonHouse.png'
import './images/alert-icon.png'
import './images/bedroomImage.png'
import './images/Whistledown-logo.png'
import './images/silouette.png'
import './images/bee-image.png'
import './images/github-icon.png'

//------QUERY SELECTORS------
const upcomingBookingDropDown = document.getElementById('upcomingBookingDropDown')
const upcomingBookings = document.getElementById('upcomingBookings')
const upcomingDropDownArrow = document.querySelector('.upcoming-dropdown-arrow')
const upcomingBookingContainer = document.getElementById('upcomingDropdownContainer')
const previousBookingDropDown = document.getElementById('previousBookingDropDown')
const previousBookings = document.getElementById('previousBookings')
const previousDropDownArrow = document.querySelector('.previous-dropdown-arrow')
const previousBookingContainer = document.getElementById('previousDropdownContainer')

const customerContent = document.querySelector('.main')
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
const overlayMain = document.querySelector('.overlay-main')
const overlayLogin = document.querySelector('.overlay-login')
const userLoginForm = document.getElementById('userLoginForm')
const usernameInput = document.getElementById('userInputID');
const passwordInput = document.getElementById('userInputPassword');
const userLoginButton = document.getElementById('userLoginButton')
const unmatchedCredentialsError = document.querySelector('.unmatched-credentials-error')
const emptyFieldsError = document.querySelector('.empty-fields-error')
const loadingCircle = document.getElementById('loadingCircle')
const welcomeMessage = document.getElementById('welcomeMessage')

// ------GLOBAL VARIABLES------
const store = {
  hotel: new Hotel(),
  // customerRepo: new CustomerRepository(),
  bookingData: [],
  roomData: [],
  customersData: [],
  currentCustomer: new Customer(),
  currentDate: new Date()
}
// -------WINDOW LOAD FUNCTIONS------
function initializeApp(customerID) {
  getAllData(customerID)
    .then((data) => {
        store.roomData = data.roomsData
        store.bookingData = data.bookingsData;
        store.hotel = new Hotel(store.roomData, store.bookingData)
        store.currentCustomer = new Customer(data.customerData.id, data.customerData.name)
        store.currentDate = getCurrentDate()
        setMinDate(store.currentDate)
        show(loadingCircle)
        setTimeout(() => {
        setUpCustomerDashboard()
        hide(loadingCircle)
        }, 2000)
    })
    .catch((err) => {
      console.error('CATCH ERROR', err);
      show(unmatchedCredentialsError)
    })
}


//------ NETWORK REQUEST FUNCTIONS------
function createNewBooking(userID, date, roomNumber, event) {
  console.log(date)
  postBooking(userID, date, roomNumber)
    .then((data) => {
      // console.log("Is it getting here?")
      store.hotel.addNewBooking(data.newBooking)
      store.hotel.getCustomerTotalCost(userID, store.currentDate)
      getCumulativeCost(store.currentCustomer);
      getRoomTypeDisplay(store.hotel.getRoomTypes())
      removeBookedRoom(event.target.parentNode)
      show(bookRoomSuccessPopup)
      bookRoomSuccessPopup.focus()
      show(overlayMain)
    })
    .catch((err) => {
      console.error('CATCH ERROR', err);
      show(networkErrorPopup)
      show(overlayMain)
      networkErrorPopup.focus()
    })
}

// ------EVENT LISTENERS------

userLoginButton.addEventListener('click', checkEmptyInputs)

upcomingBookingDropDown.addEventListener('click', toggleUpcomingBookingsDisplay)

submitButton.addEventListener('click', searchFilter)

previousBookingDropDown.addEventListener('click', togglePreviousBookingsDisplay)

availableRooms.addEventListener('click', bookRoom)

window.addEventListener('click', closeMessage)

// window.addEventListener('keyup', (event) => {
//   if(event.key === 'Escape') {
//     hide(event.parentNode)
//     hide(overlay)
//   }})


// ------EVENT HANDLERS/FUNCTIONS------
function checkEmptyInputs(event) {
  event.preventDefault()
  if(!usernameInput.value || !passwordInput.value) {
    hide(unmatchedCredentialsError)
    show(emptyFieldsError)
  } else {
    checkValidInputs()
  }
}

function checkValidInputs() {
  const isValidUsername= checkValidUsername(usernameInput.value)
  const usernameID = getUserID(usernameInput.value)
  const isValidPassword = parsePassword(passwordInput.value)
  if (isValidPassword && isValidUsername) {
    initializeApp(usernameID)
    hide(emptyFieldsError)
    hide(unmatchedCredentialsError)
  } else {
    hide(emptyFieldsError)
    show(unmatchedCredentialsError)
  }
}

function getUserID(id) {
  const toSlice = ((id.length)-8)* -1
  return id.slice(toSlice)
}

function parsePassword(password) {
  return password === 'overlook2021'
}

function checkValidUsername(username) {
  return username.slice(0,8) === 'customer'
}

function setUpCustomerDashboard() {
  welcomeMessage.innerText = `Welcome ${store.currentCustomer.name}!`
  show(welcomeMessage)
  hide(userLoginForm)
  show(customerContent)
  getCumulativeCost(store.currentCustomer);
  getRoomTypeDisplay(store.hotel.getRoomTypes());
}

function getCumulativeCost(currentCustomer) {
  cumulativeCost.innerText = `$${store.hotel.getCustomerTotalCost(currentCustomer.id, store.currentDate)}`
}

function toggleUpcomingBookingsDisplay() {
  upcomingBookings.classList.toggle('bookings-open')
  upcomingDropDownArrow.classList.toggle('upcoming-dropdown-arrow-open');
  if(upcomingBookings.classList.contains('bookings-open')) {
    upcomingBookingContainer.ariaExpanded = 'true';
    displayCustomerBookings(upcomingBookingContainer, store.hotel.findUpcomingCustomerBookings(store.currentCustomer.id, store.currentDate), upcomingBookingContainer)
  } else {
    upcomingBookingContainer.ariaExpanded = 'false';
    upcomingBookingContainer.innerHTML = ''
  }
}

function togglePreviousBookingsDisplay() {
  previousBookings.classList.toggle('bookings-open');
  previousDropDownArrow.classList.toggle('previous-dropdown-arrow-open');
  if(previousBookings.classList.contains('bookings-open')) {
    previousBookingContainer.ariaExpanded = 'true';
    displayCustomerBookings(previousBookingContainer, store.hotel.findPreviousCustomerBookings(store.currentCustomer.id, store.currentDate), previousBookingContainer)
  } else {
    previousBookingContainer.ariaExpanded = 'false';
    previousBookingContainer.innerHTML = ''
  }
}


function displayCustomerBookings(containerElement, bookings, bookingContainer) {
  containerElement.innerHTML = `
  <div class="bookings-header-container">
    <h4 class="dropdown-header-date">Date</h4>
    <h4 class="dropdown-header-room-number">Room<br>Number</h4>
    <h4 class="dropdown-header-cost">Cost</h4>
  </div>
  `;
  bookings.forEach((booking) => {
    bookingContainer.innerHTML += `
    <div class="booking">
      <p class="booking-date">${booking.date}</p>
      <p class="booking-room">${booking.roomNumber}</p>
      <p class="booking-cost">$${store.hotel.getRoomCost(booking.roomNumber)}
    </div>
    `
  })
}

function getRoomTypeDisplay(roomTypes) {
  roomTypePicker.innerHTML = `<option value="Any">Any</option>`
  roomTypes.forEach((roomType) => {
    roomTypePicker.innerHTML += `
      <option value="${roomType}">${roomType}</option>
    `
  })
}

function searchFilter() {
  if(datePicker.value && roomTypePicker.value==='Any') {
    const date = formatDate(datePicker.value)
    displayAvailableRooms(store.hotel.getAvailableRooms(date))
  } else if(datePicker.value && roomTypePicker !== 'Any') {
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
    hide(chooseDateError)
    show(availableRoomsHeader)
    availableRooms.innerHTML = ''
    availableRooms.ariaExpanded = true
    rooms.forEach((room, index) => {
      availableRooms.innerHTML+= `
        <section class="room-card" id="cardNumber:${index}" tabindex="0">
          <figure class="picture">
            <img src="images/bedroomImage.png" class="bedroom-image" alt="brightly lit victorian bedroom">
          </figure>
          <section class="room-details">
            <p class="room-info room-number">Room Number: ${room.number}</p>
            <p class="room-info room-type">Type: ${room.roomType}</p>
            <p class="room-info bed-size">Bed Size: ${room.bedSize}</p>
            <p class="room-info number-of-beds">Number of beds: ${room.numBeds}</p>
            <p class="room-info cost-per-night">Cost: $${room.costPerNight}</p>
          </section>
          <button class="book-room-button" id="${room.number}">BOOK ROOM</button>
        </section>
      `
    }) 
  } 
}

function bookRoom(event) {
  const date = formatDate(datePicker.value)
  createNewBooking(store.currentCustomer.id, date, event.target.id, event)
}

function removeBookedRoom(parentNode) {
  parentNode.parentNode.removeChild(parentNode)
}

function displayApology() {
  show(noDateAvailablePopup)
  noDateAvailablePopup.focus()
}


function closeMessage(event) {
  if(event.target.classList.contains('dismiss')) {
  hide(event.target.parentNode)
  hide(overlayMain)
  }
}

// ------UTILITY FUNCTIONS------

function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}

function setMinDate(date) {
  datePicker.min = date.split('/').join('-')
}

function formatDate(date) {
  return date.split('-').join('/')
}

function getCurrentDate() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}/${month}/${day}`
}