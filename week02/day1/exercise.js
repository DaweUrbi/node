/**
 * Create a server using express that has the following routes:
 * Consider the resources / paths / methods...
 *
 * CREATE:  GET     /new        Form for new pet.
 * SAVE:    POST    /new        Create the new pet (handle submission.)
 * READ:    GET     /           Index of Pets (Displays All)
 * EDIT:    GET     /edit/:id   Render populated form.
 * UPDATE:  POST    /edit/:id   Update pet resource (handle submission.)
 * DELETE:  POST    /delete/:id Remove pet resource.
 *
 * The forms should be rendered using ejs.
 *
 * STRETCH (BONUS): The server should have a JSON file that stores the pets.
 *
 */
 const bodyParser = require("body-parser");
 const express = require("express");
 const morgan = require("morgan");
 
 let pets = [{ id: 1, name: "Zoey", age: 1, type: "dog" }];
 
 const app = express();
 app.use(morgan("dev"));
 app.use(bodyParser.urlencoded({ extended: true }));
 
 app.set("view engine", "ejs");
 
 app.get("/", (req, res) => {
   res.render("pets", { pets });
 });
 
 app.get("/new", (req, res) => {
   res.render("newPet");
 });
 
 app.post("/new", (req, res) => {
   const body = req.body;
   console.log("body", body);
   const newPet = { ...req.body, id: pets.length + 1 };
   pets.push(newPet);
   res.redirect("/");
 });
 
 app.get("/edit/:id", (req, res) => {
   console.log("params", req.params);
   //   const id = Number(req.params.id)
   const id = +req.params.id;
   console.log("id", id);
   const petSelected = pets.find((pet) => pet.id === id);
   res.render("editPet", { pet: petSelected });
 });
 
 app.post("/edit/:id", (req, res) => {
   const id = +req.params.id;
   const updatedPet = { ...req.body };
   console.log(pets);
   pets = pets.map((pet) => {
     if (pet.id === id) {
       return { ...pet, ...updatedPet };
     }
     return pet;
   });
 
   res.redirect("/");
 });
 
 app.post("/delete/:id", (req, res) => {
   const id = +req.params.id;
   pets = pets.filter((pet) => pet.id !== id);
   res.redirect("/");
 });
 
 app.listen(3001, () => console.log("server running 3001"));