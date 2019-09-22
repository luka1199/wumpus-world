var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 8080;

connect().use(serveStatic(__dirname)).listen(port);

console.log("Running Wumpus World");
console.log('Running on http://localhost:' + port);