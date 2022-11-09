import Customer from "./Customer";

class CustomerRepository {
  constructor(allCustomerData) {
    this.allCustomers = this.makeAllCustomers(allCustomerData) || [];
  }

  makeAllCustomers(data) {
    return data.map((data) => {
      return new Customer(data.id, data.name)
    })
  }
  
  findCustomerByID(id) {
    return this.allCustomers.find((customer) => {
      return customer.id === id
    })
  }


}

export default CustomerRepository