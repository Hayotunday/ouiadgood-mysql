import dotenv from 'dotenv'
dotenv.config();
import mysql from 'mysql';

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

if (db) {
  console.log("DATABASE CONNECTED")
}

const createDatabase = async (req, res) => {
  let dbQuery = `create database if not exists ouiadgood`
  await db.query(dbQuery, (err, data) => {
    if (err) return console.log(err)
  })
}

const createTbUsers = async (req, res) => {
  let dbQuery = `create table if not exists ouiadgood.users(
    _id int NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    email varchar(60) NOT NULL UNIQUE,  
    username varchar(45) NOT NULL UNIQUE,
    password varchar(45) NOT NULL,
    admin boolean NOT NULL,
    heart int NOT NULL,
    totalheart int,
    referral boolean,
    numberOfReferred int,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
  )`
  await db.query(dbQuery, (err, data) => {
    if (err) return console.log(err)
  })
}

const createTbCharity = async (req, res) => {
  let dbQuery = `create table if not exists ouiadgood.charity(
    _id int NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    name varchar(100) NOT NULL,
    about varchar(250) NOT NULL,
    heart int NOT NULL,
    url varchar(250),
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
  )`
  await db.query(dbQuery, (err, data) => {
    if (err) return console.log(err)
  })
}

const createTbMoney = async () => {
  let dbQuery = `create table if not exists ouiadgood.money(
    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    totalmoney double NOT NULL,
    creacreateAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
  )`
  await db.query(dbQuery, (err, data) => {
    if (err) return console.log(err)
  })
}

const createAdminProfile = async (req, res) => {
  let dbQuery = `select * from ouiadgood.users where email = 'Administrator@gmail.com'`

  db.query(dbQuery, (err, data) => {
    if (err) { return console.log(err) }
    else {
      if (data.length === 0) {
        dbQuery = `insert into ouiadgood.users (email, username, password, admin, heart, totalheart, referral, numberOfReferred)
          values ('Administrator@gmail.com', 'Administrator', 'Iamadmin', '1', '0', '0', '0', '0')`

        db.query(dbQuery, (err, data) => {
          if (err) return console.log(err)
        })
      }
    }
  })

  db.query(dbQuery, (err, data) => {
    if (err) return console.log(err)
  })
}

export const connectToDB = async () => {
  await createDatabase();
  await createTbCharity();
  await createTbMoney();
  await createTbUsers();
  await createAdminProfile();
}