const express = require('express');
const router = express.Router();

module.exports = ({
  getLeaderBoard
}) => {
  router.get('/', (req, res) => {
    getLeaderBoard().then((users) => {
      res.json(users)
  })
  });

  return router;
};