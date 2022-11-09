import chai from 'chai';
import CustomerRepository from '../src/CustomerRepository';
import customersData from '../src/data/CustomerRepository-data'

const expect = chai.expect;

describe('CustomerRepository', () => {
  let customerData, customer1, customer2, customer3, customerRepo

  beforeEach(() => {
    customerData = [customer1, customer2, customer3]
    customer1 = customersData[0]
    customer2 = customersData[1]
    customer3 = customersData[2]
    customerRepo = new CustomerRepository(customerData)
  })

  console.log(customerRepo)

  it('should be a function', () => {
    expect(CustomerRepository).to.be.a('function');
  });

  it('should be an instance of Customer Repository', () => {
    expect(customerRepo).to.be.an.instanceOf(CustomerRepository)
  });

  it('should pass and store customer data as an argument', () => {
    expect(customerRepo.allCustomers).to.deep.equal(customerData)
  });

  it('should contain customer infomation', () => {
    expect(customerRepo.allCustomers[0]).to.deep.equal({
      id: 1,
      name: "Leatha Ullrich"
      })
  });
});