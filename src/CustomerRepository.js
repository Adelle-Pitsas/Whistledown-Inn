class CustomerRepository {
  constructor(allCustomerData) {
    this.allCustomers = allCustomerData || [];
  }

  findCustomerByID(id) {
    return this.allCustomers.find((customer) => {
      return customer.id === id
    })
  }
}

export default CustomerRepository