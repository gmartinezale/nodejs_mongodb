var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collectionUser = db.get('userlist');
  collectionUser.find({},{},function(e,data){
  	res.json(data);
  });
});

router.post('/adduser', function(req,res){
	var db = req.db;
	var collectionUser = db.get('userlist');
	collectionUser.insert(req.body,function(err,result){
		res.send(
			(err === null) ? {msg:''}:{msg:err}
		);
	});
});

router.delete('/deleteuser/:id',function(req,res){
	var db = req.db;
	var collectionUser = db.get('userlist');
	var userToDelete = req.params.id;
	collectionUser.remove({'_id':userToDelete},function(err){
		res.send((err === null) ? {msg:''}:{msg:err});
	});
})

module.exports = router;