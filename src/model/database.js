/* eslint-disable no-use-before-define */
const mysql = require('mysql2/promise');

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const connection = await mysql.createConnection({
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
  });

  global.connection = connection;
  return connection;
}

async function query(sql) {
  const conn = await connect();
  const [rows] = await conn.query(sql);
  return rows;
}

function queryBuilder() {
  const Query = {
    clauses: [],
    values: [],
  };

  function where(field, operator, value) {
    Query.clauses.push(`WHERE ${field} ${operator} ?`);
    Query.values.push(value);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function and(field, operator, value) {
    Query.clauses.push(`AND ${field} ${operator} ?`);
    Query.values.push(value);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function join(table, condition) {
    Query.clauses.push(`JOIN ${table} ON ${condition}`);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function orderBy(column, direction) {
    Query.clauses.push(`ORDER BY ${column} ${direction}`);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function update(table, field, value) {
    Query.clauses.push(`UPDATE ${table} SET ${field} = ${value}`);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function limit(count) {
    Query.clauses.push(`LIMIT ${count}`);
    return {
      where, and, join, offset, orderBy, limit, execute, update,
    };
  }

  function build() {
    return {
      queryParts: Query.clauses.join(' '),
      values: Query.values,
    };
  }

  function select(table, columns) {
    Query.clauses.push(`SELECT ${columns.join(', ')} FROM ${table}`);
    return {
      where, and, join, orderBy, offset, limit, execute, update,
    };
  }

  function offset(count) { // Função 'offset' para adicionar a cláusula OFFSET
    Query.clauses.push(`OFFSET ${count}`);
    return {
      where, and, join, orderBy, limit, execute, update,
    };
  }

  function execute() {
    const builtQuery = build();
    const { queryParts, values } = builtQuery;
    const replacedQuery = queryParts.replace(/\?/g, () => values.shift());
    Query.clauses = [];
    Query.values = [];
    return replacedQuery;
  }

  return {
    select,
    where,
    and,
    join,
    orderBy,
    limit,
    execute,
    offset,
    update,
  };
}

module.exports = { query, queryBuilder };
