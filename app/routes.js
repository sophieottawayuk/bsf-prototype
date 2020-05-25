const express = require('express')
const router = express.Router()

var responsibleEntity;
var representative;
var yourDetailsSectionComplete;
var responsibleEntitySectionComplete;
var representativeSectionComplete;

/* Set all sections to incomplete on load*/
router.get('/', function (req, res) {
  yourDetailsSectionComplete = false;
  responsibleEntitySectionComplete = false;
  representativeSectionComplete = false;
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

router.post('/representative-submit', function (req,res) {
  representativeSectionComplete = true;
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

router.post('/representative-question-handler', function (req, res) {
  representative = req.session.data['representative']['appointment'];
  console.log(representative);
  if (representative === 'yes') {
    representative = true;
    req.session.data['representative']['appointment'] = "Yes";
    res.redirect('/representative/name')
  } else {
    representative = false;
    req.session.data['representative']['appointment'] = "No";
      res.redirect('/representative/check-answers')
  }
})

router.post('/representative-routing', function (req, res) {
  representative = req.session.data['representative']['appointment'];
  console.log(representative);
  if (representative === 'yes') {
    representative = true;
    req.session.data['representative']['appointment'] = "Yes";
    res.redirect('/representative/name')
  } else {
    representative = false;
    req.session.data['representative']['appointment'] = "No";
      res.redirect('/representative/check-answers')
  }
})

router.post('/role-handler', function (req, res) {
  console.log(req.session.data['representative']['role']);
    res.redirect('/representative/appointmentdoc')
})

router.get('/representative/check-answers', function (req, res) {
  res.render('representative/check-answers', { representative })
})



router.get('/task-list', function (req, res) {
  res.render('task-list', { responsibleEntity, responsibleEntitySectionComplete, yourDetailsSectionComplete, representativeSectionComplete })
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

router.get('/representative/representative-routing', function (req, res) {
if (representativeSectionComplete == true) {
  res.render('representative/check-answers');
}
else {
  res.render('representative/index');
}
})



module.exports = router
