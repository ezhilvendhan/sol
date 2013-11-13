var tc = (function() {
  const TABS = "TabCommunicator.tabs";
  var _id,
      _persist = function _persist(data) {
        localStorage.setItem(TABS, data);
      },
      _get = function _get() {
        return localStorage.getItem(TABS);
      },
      _destroy = function() {
        localStorage.removeItem(TABS);
      },
      getTable = function getTable() {
        return JSON.parse(_get());
      },
      setTable = function setTable(arr) {
        if(arr) _persist(JSON.stringify(arr));
      },
      getRow = function getRow(id) {
        return getTable()[id];
      },
      setRow = function setRow(id, map) {
        var table;
        if(map) {
          table = getTable();
          table[id] = map;
          _persist(JSON.stringify(table));
        }
      },
      createMsg = function createMsg(data) {
        return {
          msg: data,
          from: _id,
          time: Date.now()
        };
      },
      send = function send(sender, toId, data) {
        var row = getRow(toId),
            msg;
        if(row) {
          msg = createMsg(data);
          msg.to = toId;
          row.inbox.push(msg);
          sender.outbox.push(msg);
          setRow(toId, row);
          setRow(_id, sender);
        }
      },
      sendMsg = function sendMsg(data) {
        var recipients = Array.prototype.slice.call(arguments, 1),
            sender = getRow(_id),
            tabs;
        if(recipients.length === 0) {
          tabs = getTable();
          if(tabs) {
            for(var idx = 0; idx < tabs.length; idx++) {
              send(sender, idx, data);
            }
          }
        } else {
          recipients.forEach(function sendAll(toId, idx) {
            send(sender, toId, data);
          });
        }
      },
      receiveMsg = function receiveMsg(){
        var row = getRow(_id),
            msg = row.inbox.pop();
        if(msg) {
          setRow(_id, row);
          return msg.msg;
        }
        return msg;
      },
      clear = function() {
        setRow(_id, null);
      },
      init = function init() {
        var table = getTable();
        if(!table) {
          setTable([]);
          table = getTable();
        }
        _id = table.length++;
        setRow(_id, {inbox: [], outbox: []});
      };

  init();
  return {
    sendAll: sendMsg,
    send: sendMsg,
    receive: receiveMsg,
    reset: _destroy,
    clear: clear,
    id: function() { return _id;}
  }
})();

setInterval(function() {
  var msg = tc.receive();
  if(msg) alert(msg);
}, 5000);