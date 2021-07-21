module.exports = class RefreshToken {
  constructor(id, userId, validUntil, createdDatetime) {
    this.id = id;
    this.userId = userId;
    this.validUntil = validUntil;
    this.createdDatetime = createdDatetime;
  }
};
