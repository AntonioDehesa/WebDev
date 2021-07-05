//jshint esversion:6
/*const fs = require('fs');

fs.copyFileSync("file1.txt", "file2.txt");*/

var superheroes = require("superheroes");

var mySuperheroeName = superheroes.random();

var villains = require("supervillains");

var villain = villains.random();

console.log(mySuperheroeName + " vs " + villain);