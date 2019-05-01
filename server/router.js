const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/desc')
  .post(controller.post)
router
  .route('/desc/:id')
  .get(controller.get)
  .delete(controller.del)
  .put(controller.put)
router
  .route('/all')
  .get(controller.getAll)
  .delete(controller.delAll)
router
  .route('/getPlay/:queries')
  .get(controller.getPlay)

module.exports = router;
