exports.showAll = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}
			connection.query('SELECT * FROM jobs', [], function(error, results) {
        console.log(results);
				if (error) return next(error);
					res.render( 'lolo', {
            layout: false,
						jobs : results

				});
		});
	});

};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){
			return next(err);
		}
		var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      title : input.title,
      description : input.description,
      location_id : 1,
      workers_id : 1,
      job_status : input.job_status
    };
		connection.query('insert into jobs set ?', [data], function(err, results) {
			if (err)
				console.log("Error inserting : %s ",err );
			res.redirect('/worker/lolo');
		});
	});
};

exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE jobs SET ? WHERE Id = ?', [data, Id], function(err, rows){
			if (err){
				console.log("Error Updating : %s ",err );
			}
			res.redirect('/worker/lolo');
		});
	});
};
