const express = require('express');
const router = express.Router();

const MegaMillionsManager = require('../managers/MegaMillionsManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/load', async(req, res, next) =>{
  try {
    await MegaMillionsManager.loadData();
    res.send('all good :)');
  } catch(e){
    console.error('error: ' + e);
    res.send(e);
  }
});

router.post('/winning-numbers/mega-millions', async(req,res) =>{
  try {

  } catch (exception){
    console.error('something went wrong :(');
    console.error('Error: ' + JSON.stringify(exception));
  }
});

module.exports = router;
