const express = require('express')
const router = express.Router()

var responsibleEntity;
var yourDetailsSectionComplete;
var responsibleEntitySectionComplete;

/* Set all sections to incomplete on load*/
router.get('/', function (req, res) {
  yourDetailsSectionComplete = false;
  responsibleEntitySectionComplete = false;
  res.render('index');
})

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
  res.render('responsible-entity/check-answers', { responsibleEntity })
})

router.get('/task-list', function (req, res) {
  res.render('task-list', { responsibleEntity, responsibleEntitySectionComplete, yourDetailsSectionComplete })
})


/*Routing to allow return to start of section or check answers depending on whether section completed*/
router.get('/your-details/about-you-routing', function (req, res) {
if (yourDetailsSectionComplete == true) {
  res.render('your-details/check-answers');
}
else {
  res.render('your-details/name');
}
})

router.get('/responsible-entity/responsible-entity-routing', function (req, res) {
if (responsibleEntitySectionComplete == true) {
  res.render('responsible-entity/check-answers');
}
else {
  res.render('responsible-entity/index');
}
})



module.exports = router
