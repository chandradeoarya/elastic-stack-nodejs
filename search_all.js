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

	const search = function search(index, body) {
		return esClient.search({index: index, body: body});
	};

	// only for testing purposes
	// all calls should be initiated through the module
	const test = function test() {
		let body = {
			size: 20,
			from: 0,
			query: {
				match_all: {}
			}
		};

		console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
		search('library', body)
		.then(results => {
			console.log(`found ${results.hits.total} items in ${results.took}ms`);
			console.log(`returned article titles:`);
			results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		search
	};
} ());