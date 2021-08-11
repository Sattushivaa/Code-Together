var ws = require('ws');
var server = new ws.Server({ port: 3080 });
var clients = [];

console.log('server started...');

function sendIn(obj, meeting) {
  for (let i = 0; i < clients.length; i++) {
    clients[i].meeting == meeting ? clients[i].client.send(JSON.stringify(obj)) : '';
  }
}

function meeters(client) {
  let arr = [];
  let meeting = clients.find((e) => e.client == client).meeting;
  this.meeting = meeting;
  for (let i = 0; i < clients.length; i++) { clients[i].meeting == meeting ? arr.push(clients[i]) : ''; }
  this.arr = arr;
}
server.on('connection', (newclient) => {
  clients.push({ client: newclient, num : clients.length });
  //console.log(clients[clients.length-1]==newclient);
  console.dir('@ new client connected');
  newclient.onmessage = data => JSON.parse(data.data).myname ? (function() {
      clients.find((e) => e.client == newclient).name = JSON.parse(data.data).myname;
      sendIn({ type: 'member', clients: new meeters(newclient).arr },
        clients.find((e) => e.client == newclient).meeting)
    })() :
    JSON.parse(data.data).join ? (() => { clients.find((e) => e.client == newclient).meeting = JSON.parse(data.data).join;
      sendIn({ type: 'member', clients: new meeters(newclient).arr }, new meeters(newclient).meeting) })() : sendIn(JSON.parse(data.data), clients.find((e) => e.client == newclient).meeting);
  //sendIn({ type: 'member', clients });
});