//code runnen
// 1) npm install
// 2) npm start
// 3) code runt automatisch op poort 3000
//app.use(cors({
  //origin: 'https://banana-sundae-55904.herokuapp.com'
//}));


const express = require('express');
const route = express.Router();
//var cors = require('cors')
//route.use(cors())

//var cors = require('cors');//aanpassinh

//route.use(cors();//aanpassing

// static data (array)
const messages = [
 {
   id: 1,
   user: "Pikachu",
   message: "pika pika"
 },
 {
   id: 2,
   user: "Ash",
   message: "I choose you!"
 },
 {
   id: 3,
   user: "Misty",
   message: "Can't drive, it's to misty"
 },
 
 {
   id: 911,
   user: "Emergency",
   message: "bee doo bee doo"
 }
 
 
 
];


// ga naar pagina => POSTMAN: localhost:3000/
route.get('/', function(request, response, next) {

  // Render express index pagina
  response.render('index', { title: 'Lab 5' });
  response.end();
});

//---------------------------GET-----------------------------------//
// alle messages opvragen of via gebruikersnaam
// link => URL: localhost:3000/api/v1/messages
// link => URL: localhost:3000/api/v1/messages?user=Ash
route.get('/api/v1/messages', (request, response) => {

  if (!request.query.user) {
      // geen message gevonden = foutmelding
      response.json({
       status:"success",
       message: "GETTING all messages, count "+ messages.length +" messages"});
  }
  else {
      // wel message gevongen = json doorsturen
      response.json({"message" : "GETTING message with username "+ request.query.user});
  }
});

//---------------------------GET-----------------------------------//
// message opvragen via id
// link => URL: localhost:3000/api/v1/messages/NrID
route.get('/api/v1/messages/:id', (request, response) => {

  // controleren of er een ID overeenkomt met een bestaande ID
  const message = messages.find(my_int => my_int.id === parseInt(request.params.id));

  
  if(!message){
    // geen message gevonden = foutmelding
    response.status(404).json({status:"error","message":"Message with ID " + request.params.id +" does not exist"})
  }
  else {
    // wel message gevongen = json doorsturen
    response.json({status:"success", message:"GETTING message with ID " + request.params.id});
  }
});

//---------------------------POST-----------------------------------//
// message posten
// link => POSTMAN: POST: localhost:3000/api/v1/messages 
route.post('/api/v1/messages/', (request, response) => {

  // De ID word automatisch bijgevoegd  bij een nieuwe post (auto increment)
  const new_message = { id: request.params.id, user: request.query.user, message: request.body.message };
  
  // new message toevoegen aan het einde van de array
  messages.push(new_message);
  response.json({ status:"success", message:"POSTING a new message for user " + request.query.user});
});


//---------------------------PUT-----------------------------------//
// message wijzigen via gekozen id
// link => POSTMAN: localhost:3000/api/v1/messages/NrID
route.put('/api/v1/messages/:id', (request, response) => {

  const message = messages.find(my_int => my_int.id === parseInt(request.params.id));

  if(!message){
    // geen message gevonden = foutmelding
    response.status(404).json({status:"error","message":"Message with ID "+ request.params.id +" does not exist"})
  }
  else {
    // wel message gevongen = json doorsturen
    // message wijzigen op specifieke index
    messages.splice({id: request.params.id}, 1, request.body);
    response.json({status:"success", message: "UPDATING a message with ID "+ request.params.id});
  } 
});


//---------------------------DELETE-----------------------------------//

// Message verwijderen via id
// link => POSTMAN: localhost:3000/api/v1/messages/NrID
route.delete('/api/v1/messages/:id', (request, response) => {


  const message_to_delete = messages.find(a => a.id === parseInt(request.params.id));

   if(!message_to_delete){
     // geen message gevonden = foutmelding
     response.status(404).json({status:"error", message:"The id "+request.params.id+" does not exist"})
   }
   else {
      // wel message gevonden
      // vind de index van de message 
      const index = messages.indexOf(message_to_delete);
      // verwijder message
      messages.splice(index, 1);
      // json doorsturen
      response.json({status:"success", message:"DELETING a message with ID "+ request.params.id});
   }
});


module.exports = route;
console.log('Server is running on port', 3000);
