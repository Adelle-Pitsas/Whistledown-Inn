import chai from 'chai';
import CustomerRepository from '../src/CustomerRepository';
import customersData from '../src/data/CustomerRepository-data';
import Customer from '../src/Customer';

const expect = chai.expect;

describe('CustomerRepository', () => {
  let customerData, customer1, customer2, customerRepo, newCustomer1, newCustomer2

  beforeEach(() => {
    customer1 = customersData[0]
    customer2 = customersData[1]
    customerData = [customer1, customer2]
    customerRepo = new CustomerRepository(customerData)
    newCustomer1 = new Customer(customer1.id, customer1.name)
    newCustomer2 = new Customer(customer2.id, customer2.name)
  })

  console.log(customerRepo)

  it('should be a function', () => {
    expect(CustomerRepository).to.be.a('function');
  });

  it('should be an instance of Customer Repository', () => {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepository)
  });

  it('should pass and store customer data as an argument', () => {
    expect(customerRepo.allCustomers).to.deep.equal([
      {
        id: 1,
        name: "Leatha Ullrich",
        username: "customer1"
      },
      {
        id: 2,
        name: "Rocio Schuster",
        username: "customer2"
      }
    ])
  });

  it('should contain customer information', () => {
    expect(customerRepo.allCustomers[0]).to.deep.equal({
      id: 1,
      name: "Leatha Ullrich",
      username: "customer1"
      })
    });

  it('should have an empty list of customers if there is no customer data', () => {
    const emptyCustomerData = []
    const customerRepo2 = new CustomerRepository(emptyCustomerData)
    expect(customerRepo2.allCustomers).to.deep.equal([])
  })

  it('should be able to find a customer by id', () => {
    const getID = customerRepo.findCustomerByID(2)
    expect(getID).to.deep.equal({
      id: 2,
      name: "Rocio Schuster",
      username: "customer2"
      })
  })

  it('should make data into instances of Customer', () => {
    expect(customerRepo.allCustomers[0]).to.be.an.instanceOf(Customer)
  })

});