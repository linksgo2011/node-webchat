var assert = require("assert");
describe.only('UserModel', function() {

	describe('#bind()', function() {
		it('存在记录数据更新case', function(done) {
			Promise.resolve(User.bind("oT7-Mwplp68gJDSZf-aUpWiEe-G4",3498,"13511111111","11111111")).then(function(data){
				assert.equal(data.result,true,"bind:");
				done();
			},function(err){
				console.log(err);
				done();
			});
		});

		it('未存在记录数据创建case', function(done) {
			var open_id = Math.floor(Math.random() * 1000000);
			var user_id = Math.floor(Math.random() * 1000);
			Promise.resolve(User.bind(open_id,user_id,"13511111111","11111111")).then(function(data){
				assert.equal(data.result,true,"bind:");
				done();
			},function(err){
				console.log(err);
				done();
			});
		});
	}
});