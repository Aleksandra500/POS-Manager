const db = require('../db')

const MessageModel = {
  
  getAllMessages: (callback) => {
    const sql = "SELECT * FROM messages ORDER BY timestamp ASC";
    db.query(sql, callback);
  },


  addMessage: (sender, text, callback) => {
    const sql = "INSERT INTO messages (sender, text) VALUES (?, ?)";
    db.query(sql, [sender, text], callback);
  }
};

module.exports = MessageModel
