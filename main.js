var socket = new WebSocket('wss://marbled-shrouded-rattlesnake.glitch.me','custom-protocall');
socket.onopen = function(e){
  document.querySelector('button').disabled = false;
}
function myname(){
  socket.send(JSON.stringify({
    myname : document.querySelector('input[placeholder="your name"]').value
  }));
}
function $(selector){
  let ems = document.querySelectorAll(selector);
  this.el = ems[0];
  this.elm = ems;
  this.selector = selector;
}
$.prototype.css = function(style){
  for(let i=0;i<this.elm.length;i++){
    Object.assign(this.elm[i].style,style)
  }
}
function css(selector,style){
  let els = new $(selector).elm;
  for(let i=0;i<els.length;i++){
    Object.assign(els[i].style,style)
  }
}
function updateCode() {
  socket.send(JSON.stringify({
    type : 'content',
    content : prv.doc
  }));
}
function hide(){
  css('.win',{
    width : '20px',
    height : '20px',
    top : '110%'
  })
}
css('#meeting',{
  top : '0px',
  left : '0px',
  width : innerWidth + 'px',
  height : innerHeight + 'px'
})
function show(selector){
  hide();
  css(selector,{
    left : '0px',
    top : '40px',
    height : innerHeight - 100 +'px',
    width : innerWidth + 'px',
    zIndex : 5
  })
}
socket.onmessage = (message) => {
  let data = JSON.parse(message.data);
  data.type=='member'?(function (){new $('#clients').el.innerHTML = '';for(let i=0;i<data.clients.length;i++){new $('#clients').el.innerHTML += `<div class="member">${data.clients[i].name||'(unknown)'}${i==0?' (admin)':''}</div>`}
  document.getElementById('admin').innerText = data.clients[0].name || '(unknown)';
  })():data.type=='content'?(function (){
    prv.doc = data.content;
  })():'';
}
css('iframe',{
  width : innerWidth + 'px',
  height : innerHeight - 100 + 'px',
  background : 'white'
});

var prv = new Vue({
  el : '#code',
  data : { doc : '' },
  watch : {
    doc : () => document.getElementById('frames').srcdoc = prv.doc
  }
})
