exports.showAll = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}
			connection.query('SELECT * FROM jobs where job_status = ?', ['Available'], function(error, jobs) {
      connection.query('SELECT * FROM jobs where job_status = ?', ['Taken'], function(error, results) {

        jobs = jobs.map(function(job){
          job.available = job.job_status === "Available";
          return job;
        })

				if (error) return next(error);
					res.render( 'lolo', {
            layout: false,
						jobs : jobs,
            newjobs : results

				});
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
			res.redirect('/worker/take');
		});
	});
};

exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE jobs SET job_status = "Taken" WHERE id ? ',[data,id], function(err, rows){
			if (err){
				console.log("Error Updating : %s ",err );
			}
			res.redirect('/worker/lolo');
		});
	});
};
