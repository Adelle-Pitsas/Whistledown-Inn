import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room'
import rooms from '../src/data/Rooms-data'

describe('Room', () => {
  let room1, room2, newRoom1, newRoom2

  beforeEach(() => {
    room1 = rooms[0];
    room2 = rooms[1];
    newRoom1 = new Room(room1)
    newRoom2 = new Room(room2)
  })

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(newRoom1).to.be.an.instanceOf(Room);
    expect(newRoom2).to.be.an.instanceOf(Room);
  })

  it('should have a number', () => {
    expect(newRoom1.number).to.equal(12);
  })

  it('should have a roomType', () => {
    expect(newRoom1.roomType).to.equal('single room');
  })

  it('should say whether or not it has a bidet', () => {
    expect(newRoom1.bidet).to.equal(false);
  })

  it('should indicate the bed size', () => {
    expect(newRoom1.bedSize).to.equal('twin');
  })

  it('should indicate the number of beds', () => {
    expect(newRoom1.numBeds).to.equal(2);
  })

  it('should indicate the cost per night', () => {
    expect(newRoom1.costPerNight).to.equal(172.09);
  })
});