const { pool } = require('@src/core/db-connection');
const debug = require('debug')('DAO');

class RawValue {
  constructor(value) {
    this.value = value;
  }
}

const numberOfString = function (x) {
  if (typeof x === 'number') {
    return x;
  } else if (x instanceof RawValue) {
    return x.value;
  } else if (x === null) {
    return 'NULL';
  } else {
    return `'${x.toString()}'`;
  }
};
const conditionsToString = (conditions) =>
  conditions.map(([f, o, v]) => `\`${f}\` ${o} ${numberOfString(v)}`).join(' AND ');
const fieldsToColumns = (fields) => fields.map((f) => `\`${f}\``).join(', ');

// 성공시 rows를 반환
async function selectRawAsync(query, values = null) {
  debug(query);
  if (values) {
    const [rows, _] = await pool.execute(query, values);
    return rows;
  } else {
    const [rows, _] = await pool.execute(query);
    return rows;
  }
}

// 성공시 해당 row를 반환 만약 없으면 null 반환
async function selectOneRawAsync(query, values = null) {
  const rows = await selectRawAsync(query, values);
  return rows[0];
}

// TODO: limit
async function selectAsync(
  table,
  fields = '*',
  conditions = [],
  order = [],
  limit = null,
  offset = 0,
) {
  const columns = fields === '*' ? '*' : fieldsToColumns(fields);
  const where = conditions.length ? ' WHERE ' + conditionsToString(conditions) : '';
  const orderBy = order.length
    ? ' ORDER BY ' + order.map(([f, a]) => `\`${f}\` ${a}`).join(', ')
    : '';
  const limitClause = limit ? ` LIMIT ${limit} OFFSET ${offset}` : '';
  const query = `SELECT ${columns} FROM \`${table}\`${where}${orderBy}${limitClause}`;
  debug(query);
  const [rows, _] = await pool.query(query);
  return rows;
}

async function selectOneAsync(
  table,
  fields = '*',
  conditions = [],
  order = [],
  limit = null,
  offset = 0,
) {
  const rows = await selectAsync(table, fields, conditions, order, limit, offset);
  return rows[0];
}

async function selectExistsAsync(table, fields, values) {
  if (fields.length !== values.length) {
    throw new Error('필드와 값의 길이가 다릅니다.');
  }

  const where = fields.map((f) => `\`${f}\` = ?`).join(' AND ');
  const rows = await selectRawAsync(
    `SELECT 1 FROM \`${table}\` WHERE EXISTS (SELECT * FROM \`${table}\` WHERE ${where})`,
    values,
  );

  return rows.length > 0;
}

// 성공시 삽입된 id를 반환
async function insertAsync(table, fields, values) {
  if (fields.length !== values.length) {
    throw new Error('필드와 값의 길이가 다릅니다.');
  }

  const columns = fieldsToColumns(fields);
  const placeholder = Array(values.length).fill('?').join(', ');
  const query = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholder})`;
  debug(query);
  const [result, _] = await pool.execute(query, values);

  return result.insertId;
}

// 성공시 반영된 rows count를 반환
async function updateAsync(table, fields, values, conditions) {
  if (fields.length !== values.length) {
    throw new Error('필드와 값의 길이가 다릅니다.');
  }

  const updates = fields.map((f, i) => `\`${f}\` = ${numberOfString(values[i])}`).join(', ');
  const query = `UPDATE \`${table}\` SET ${updates} WHERE ${conditionsToString(conditions)}`;
  debug(query);
  const [result, _] = await pool.query(query);

  return result.affectedRows;
}

// 성공시 반영된 rows count를 반환
async function deleteAsync(table, conditions) {
  const query = `DELETE FROM \`${table}\` WHERE ${conditionsToString(conditions)}`;
  debug(query);
  const [result, _] = await pool.query(query);

  return result.affectedRows;
}

module.exports = {
  RawValue,
  selectRawAsync,
  selectOneRawAsync,
  selectAsync,
  selectOneAsync,
  selectExistsAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
};
