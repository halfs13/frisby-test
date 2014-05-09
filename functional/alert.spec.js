var frisby = require('frisby');

var URL = require('../test_config.js').url;

describe("To test the alert routes", function() {
	frisby.create('prepare by deleting all records')
	.delete(URL + '/alert')
	.expectStatus(204)
	.toss();

	frisby.create('verify GET with no records succeeds')
	.get(URL + '/alert')
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'application/json')
	.expectBodyContains('[]')
	.toss();

	frisby.create('verify POST to create valid record')
	.post(URL + '/alert', {
		name: "Alert" + new Date().getTime(),
		severity: "Warning",
		type: "Weather",
		status: 'Valid',
		activationDate: new Date()
	}, {
		json: true
	})
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'json')
	.toss()

	frisby.create('verify GET with one record succeeds')
	.get(URL + '/alert')
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'application/json')
	.expectJSONLength('docs', 1)
	.expectJSONTypes({
		docs: Array,
		total_count: Number
	})
	.after(function(err, data) {
		var result = JSON.parse(data.body);

		expect(result.docs).toBeDefined();
		expect(result.docs[0]._id).toBeDefined();
		expect(result.docs[0].name).toBeDefined();
		expect(result.docs[0].severity).toBeDefined();
		expect(result.docs[0].type).toBeDefined();
		expect(result.docs[0].status).toBeDefined();
		expect(result.docs[0].activationDate).toBeDefined();
		expect(result.docs[0].__v).toBeDefined();
		expect(result.docs[0].comments).toBeDefined();
		expect(result.docs[0].tags).toBeDefined();
		expect(result.docs[0].place).toBeDefined();
		expect(result.docs[0].alert_horizon).toBeDefined();
		expect(result.docs[0].updatedDate).toBeDefined();
		expect(result.docs[0].createdDate).toBeDefined();
	})
	.toss();

	frisby.create('Finish off by deleting all records')
	.delete(URL + '/alert')
	.expectStatus(204)
	.toss();
});