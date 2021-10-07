context('test case 2 rest api', () => {
	it('print api result as markdown', () => {
		const url = 'https://public-api.zipmex.net/api/v1.0/summary';
		prepareHeader();
		getSummary(url);
	});
});

const header = 'Zipmex market cap';
const tableHeader1 = '| instrument | last_price | lowest_24hr | highest_24hr |';
const lineBreak = '|:-----------|-----------:|------------:|-------------:|';

const getSummary = async (url) => {
	cy.request(url, { log: false }).then((resp) => {
		const { data } = resp.body;
		const entries = Object.entries(data);
		entries.forEach((data) => {
			const [instrument, value] = data;
			const { last_price, lowest_24hr, highest_24hr } = value;
			cy.log(`|${instrument}|${last_price}|${lowest_24hr}|${highest_24hr}|`);
		});
	});
};

const prepareHeader = () => {
	cy.log(header);
	cy.log(tableHeader1);
	cy.log(lineBreak);
};
