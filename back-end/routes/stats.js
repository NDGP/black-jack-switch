const express = require('express');
const router = express.Router();

module.exports = ({
  getStats
}) => {
  router.get('/', (req, res) => {
      getStats()
          .then((stats) => res.json(stats))
          .catch((err) => res.json({
              error: err.message
          }));

  });

  return router;
};