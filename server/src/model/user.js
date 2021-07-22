class User {
  constructor(
    id,
    username,
    location1,
    location2,
    locationSelection,
    createdDatetime,
    updatedDatetime,
  ) {
    this.id = id;
    this.username = username;
    this.location1 = location1;
    this.location2 = location2;
    this.locationSelection = locationSelection;
    this.createdDatetime = createdDatetime;
    this.updatedDatetime = updatedDatetime;
  }
}

User.table = 'users';
User.fields = [
  'id',
  'username',
  'location1',
  'location2',
  'location_selection',
  'created_datetime',
  'updated_datetime',
];

User.fromRow = function (row) {
  const array = [];
  for (const field of User.fields) {
    array.push(row[field]);
  }
  return new User(...array);
};

module.exports = User;
