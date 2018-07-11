require('dotenv').config()

module.exports = {
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    userTable: process.env.DB_USER_TABLE,
    actionTable: process.env.DB_ACTION_TABLE,
    commandTable: process.env.DB_COMMANDS_TABLE,
    messageTable: process.env.DB_MESSAGE_TABLE,
  },
  clientURL: process.env.CLIENT_URL,
  serverPort: process.env.SERVER_PORT
};
