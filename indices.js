(function () {
	'use strict';

	const fs = require('fs');
	const { Client } = require('@elastic/elasticsearch')
	const esClient = new Client({
		node: 'http://localhost:9200/',
		maxRetries: 5,
		requestTimeout: 60000,
		sniffOnStart: true
	  })

	const indices = function indices() {
		return esClient.cat.indices({v: true})
		.then(console.log)
		.catch(err => console.error(`Error connecting to the es client: ${err}`));
	};

	// only for testing purposes
	// all calls should be initiated through the module
	const test = function test() {
		console.log(`elasticsearch indices information:`);
		indices();
	};

	test();

	module.exports = {
		indices
	};
} ());
