var mongoose = require('mongoose');
var Latest = require('../models').Latest;

describe('Create a instance of testModel', function() {
  // Integration Test
	// beforeEach(function() {
	// 	mongoose.connect('mongodb://localhost/testdb');
	// });

	// afterEach(function() {
	// 	mongoose.connection.db.executeDbCommand({
	// 		dropDatabase: 1
	// 	}, function(err, result) {
	// 		console.log(err);
	// 		console.log(result);
	// 		process.exit(0);
	// 	});
	// });

	it('should throw error if `term` is empty', function() {
		var latest = new Latest();
		latest.date = new Date;
		latest.validate(function(err) {
			expect(err).not.toBeNull();
		});
	});

	it('should throw error if `date` is empty', function() {
		var latest = new Latest();
		latest.term = 'Some Search Term';
		latest.validate(function(err) {
			expect(err).not.toBeNull();
		});
	});

});