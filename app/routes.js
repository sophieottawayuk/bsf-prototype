const express = require('express')
const router = express.Router()

var responsibleEntity;
var representative;
var buildingOwner;
var yourDetailsSectionComplete;
var responsibleEntitySectionComplete;
var representativeSectionComplete;
var buildingOwnerSectionComplete;

/* Set all sections to incomplete on load*/
router.get('/', function (req, res) {
  yourDetailsSectionComplete = false;
  responsibleEntitySectionComplete = false;
  representativeSectionComplete = false;
  buildingOwnerSectionComplete = false;
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

router.post('/building-owner-submit', function (req,res) {
  buildingOwnerSectionComplete = true;
res.redirect('task-list');
});


router.post('/responsible-entity-handler', function (req, res) {
  responsibleEntity = req.session.data['applicant']['responsible-entity'];
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

router.get('/buildingowner/check-answers', function (req, res) {
  res.render('buildingowner/check-answers', { buildingOwner })
})


router.post('/building-owner-handler', function (req, res) {
  buildingOwner = req.session.data['applicant']['buildingowner'];
  if (buildingOwner === 'yes') {
    buildingOwner = false;
      req.session.data['applicant']['buildingowner'] = "Yes";
      console.log(buildingOwner);
    res.redirect('/buildingowner/check-answers')
  } else {
    buildingOwner = true;
    req.session.data['applicant']['buildingowner'] = "No";
    console.log(buildingOwner);
      res.redirect('/buildingowner/name')
  }
})



router.get('/task-list', function (req, res) {
  res.render('task-list', { responsibleEntity, responsibleEntitySectionComplete, yourDetailsSectionComplete, representativeSectionComplete, buildingOwnerSectionComplete })
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

router.get('/buildingowner/building-owner-routing', function (req, res) {
if (buildingOwnerSectionComplete == true) {
  res.render('buildingowner/check-answers', {buildingOwner});
}
else {
  res.render('buildingowner/index');
}
})



module.exports = router
