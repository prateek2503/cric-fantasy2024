var http = require("http");
var controller = require("./lib/controller");
http.createServer(controller).listen(8000);
console.log("Server is running at port: 8000...");