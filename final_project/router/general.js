const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])
// console.log(isbn);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  // console.log(author);
  
  let bookArray = Object.values(books);
    let sbook = bookArray.filter((book) => book.author === author);
    res.send(sbook);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  const title = req.params.title;
  // console.log(author);
  
  let bookArray = Object.values(books);
    let sbook = bookArray.filter((book) => book.title === title);
    res.send(sbook);
});

public_users.delete("/:book", (req, res) => {
  const email = req.params.email;
  if (email){
      delete books[email]
  }
  res.send(`book with the email  ${email} deleted.`);
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
