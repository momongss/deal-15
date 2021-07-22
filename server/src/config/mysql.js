const host = process.env.MYSQL_HOST;
let port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const db = process.env.MYSQL_DB;

if (!host || !user || !db || !port) {
  throw new Error('MYSQL 설정이 없거나 부족합니다.');
}

try {
  port = parseInt(port);
  if (port < 0 || 65535 < port) {
    throw new Error('port가 올바르지 않습니다.');
  }
} catch {
  throw new Error('port가 숫자가 아닙니다.');
}

module.exports = {
  host,
  port,
  user,
  password,
  db,
};
