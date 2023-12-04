// db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Criar tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    cpf TEXT,
    email TEXT
  )
`);

// Criar tabela de livros
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    synopsis TEXT,
    publication_year INTEGER,
    author TEXT,
    price REAL,
    photo BLOB
  )
`);

module.exports = db;
