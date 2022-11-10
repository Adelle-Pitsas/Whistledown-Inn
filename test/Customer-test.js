import chai from 'chai';
import customersData from '../src/data/CustomerRepository-data'
import Customer from '../src/Customer';
const expect = chai.expect;

describe('Customer', () => {
  let customer1, customer2, newCustomer1, newCustomer2

  beforeEach(() => {
    customer1 = customersData[0];
    customer2 = customersData[1];
    newCustomer1 = new Customer(customer1.id, customer1.name)
    newCustomer2 = new Customer(customer2.id, customer2.name)
  })

  it('should be a function',() => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(newCustomer1).to.be.an.instanceOf(Customer)
    expect(newCustomer2).to.be.an.instanceOf(Customer)
  })

  it('should have an id', () => {
    expect(newCustomer1.id).to.equal(1)
    expect(newCustomer2.id).to.equal(2)
  })

  it('should have a name', () => {
    expect(newCustomer1.name).to.equal("Leatha Ullrich")
    expect(newCustomer2.name).to.equal("Rocio Schuster")
  })
});
