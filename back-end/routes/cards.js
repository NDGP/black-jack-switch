const express = require('express');
const router = express.Router();

module.exports = ({
  getCards
}) => {
  router.get('/', (req, res) => {
      getCards()
          .then((cards) => res.json(cards))
          .catch((err) => res.json({
              error: err.message
          }));

  });

  return router;
};