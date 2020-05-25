const express = require('express')
const router = express.Router()

var responsibleEntity;
var yourDetailsSectionComplete;
var responsibleEntitySectionComplete;

// Add your routes here - above the module.exports line
router.post('/start-journey', function (req,res) {
res.redirect('task-list');
});

router.post('/your-details-submit', function (req,res) {
  yourDetailsSectionComplete = true;
res.redirect('task-list');
});

router.post('/responsible-entity-submit', function (req,res) {
  responsibleEntitySectionComplete = true;
res.redirect('task-list');
});

router.post('/responsible-entity-handler', function (req, res) {

  responsibleEntity = req.session.data['applicant']['responsible-entity'];
  console.log(responsibleEntity);

  if (responsibleEntity === 'no') {
    responsibleEntity = true;
    res.redirect('/responsible-entity/name')
  } else {
    responsibleEntity = false;
    res.redirect('/responsible-entity/check-answers')
  }
})

router.get('/responsible-entity/check-answers', function (req, res) {
  console.log("It loaded");
  console.log(responsibleEntity);
  res.render('responsible-entity/check-answers', { responsibleEntity })
})

router.get('/task-list', function (req, res) {
  res.render('task-list', { responsibleEntity, responsibleEntitySectionComplete, yourDetailsSectionComplete })
})


module.exports = router
