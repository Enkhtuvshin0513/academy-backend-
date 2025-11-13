import http from "http";

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    return res.end("Hello World GEt");
  }
  res.end("Hello World POST");
});

server.listen(3000);

console.log("server listening on 3000");
