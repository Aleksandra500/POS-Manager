const db = require('../db');

const MessageModel = {
  // GLOBALNI CHAT
  getAllMessages: (callback) => {
    const sql = "SELECT * FROM messages ORDER BY timestamp ASC";
    db.query(sql, callback);
  },

  addMessage: (sender, text, callback) => {
    const sql = "INSERT INTO messages (sender, text) VALUES (?, ?)";
    db.query(sql, [sender, text], callback);
  },

  // PRIVATNI CHAT
  getPrivateMessages: (roomId, callback) => {
    const sql = "SELECT * FROM private_messages WHERE roomId = ? ORDER BY timestamp ASC";
    db.query(sql, [roomId], callback);
  },

  addPrivateMessage: (roomId, sender, text, callback) => {
    const sql = "INSERT INTO private_messages (roomId, sender, text) VALUES (?, ?, ?)";
    db.query(sql, [roomId, sender, text], callback);
  }
};

module.exports = MessageModel;
