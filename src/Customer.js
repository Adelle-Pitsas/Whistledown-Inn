class Customer {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.username = this.createUsername(id);
  }

  createUsername(id) {
    return `customer${id}`
  }
}

export default Customer;