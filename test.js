const expect = require('chai').expect;

describe('test', () => {
	it('i should concat 2 values with a callback', (done) => {
		var testvalue = 'testvalue';

		function iDoSomething(value, callback) {
			callback(value + ' callbacked');
		}

		function iWillBeCallbacked(value) {
			expect(value).to.equal(testvalue + ' callbacked');
			done();
		}

		iDoSomething(testvalue, iWillBeCallbacked);
	});

	it('i should concat 2 values with a promise', (done) => {
		var testvalue = 'testvalue';

		function iDoSomething(value) {
			return new Promise(resolve => {
				resolve(value + ' promise resolved');
			});
		}

		iDoSomething(testvalue)
		.then(result => {
			expect(result).to.equal(testvalue + ' promise resolved');
			done();
		});
	});

	it('should filter an array', () => {
		var testArray = [1,2,3,4,5,6,7];
		var expectedResult = [4,5,6,7];

		function filter(arr, filterExpression) {
			var resultArray = [];
			for (var i = 0; i < arr.length; i++) {
				if (filterExpression(arr[i])) {
					resultArray.push(arr[i]);
				}
			}
			return resultArray;
		}

		function allNumbersAboveThree(value) {
			return value > 3;
		}

		var result = filter(testArray, allNumbersAboveThree);

		expect(result).to.deep.equal(expectedResult);
		expect(testArray.filter(allNumbersAboveThree)).to.deep.equal(expectedResult);

		expect(testArray.filter(function(v) { return v > 3; })).to.deep.equal(expectedResult);
		expect(testArray.filter((v) => { return v > 3; })).to.deep.equal(expectedResult);
		expect(testArray.filter(v => { return v > 3; })).to.deep.equal(expectedResult);
		expect(testArray.filter(v => v > 3)).to.deep.equal(expectedResult);
	});
});
