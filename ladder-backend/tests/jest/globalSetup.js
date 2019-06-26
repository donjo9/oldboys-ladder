require("@babel/register");
require("core-js");
require("regenerator-runtime/runtime");

const server = require("../../src/server").default;
console.log("The Test server is running!");
module.exports = async () => {
    global.httpServer = await server.start({ port: 4000 });
};
