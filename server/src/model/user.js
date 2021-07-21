module.exports = class User {
  constructor(id, username, location1, location2, createdDatetime, updatedDatetime) {
    this.id = id;
    this.username = username;
    this.location1 = location1;
    this.location2 = location2;
    this.createdDatetime = createdDatetime;
    this.updatedDatetime = updatedDatetime;
  }
};
