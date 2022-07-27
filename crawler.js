const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

const getCharacterNames = async () => {
	try {
		const { data } = await axios.get(
			'https://suikoden.fandom.com/wiki/Recruitment_(Suikoden)'
		);
		const $ = cheerio.load(data);
		let characterNames = [];

		$('td > b > a').each((_idx, el) => {
			const characterName = $(el).text()
			characterNames.push({ "name": characterName })
		});

		return characterNames;
	} catch (error) {
		throw error;
	}
};

getCharacterNames()
	.then((characterNames) => {
		//you were here--trying to figure out how to get multiple scraped data into one object
		fs.writeFile("/Users/ashleyvalentine/Documents/code/suikoden_web_crawler/characters.json", JSON.stringify(characterNames), (err) => {
			if (err)
			  console.log(err)
			else {
			  console.log("File written successfully\n");
			}
		  })
		}
	);


const getRecruitmentInfo = async () => {
	try {
		const { data } = await axios.get(
			'https://suikoden.fandom.com/wiki/Recruitment_(Suikoden)'
		);
		const $ = cheerio.load(data);
        const recruitmentInfo = [];

        $('tr > td:last-child').each((_idx, el) => {
            const recruitCharacter = $(el).text()
            recruitmentInfo.push(recruitCharacter)
        });

		return recruitmentInfo.map(string => string.slice(0, -1));
	} catch (error) {
		throw error;
	}
};

const recruitmentInfo = getRecruitmentInfo()

console.log(recruitmentInfo)



//original code from https://www.scrapingbee.com/blog/web-scraping-javascript/#outcomes
// const axios = require('axios');
// const cheerio = require('cheerio');

// const getPostTitles = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			'https://old.reddit.com/r/programming/'
// 		);
// 		const $ = cheerio.load(data);
// 		const postTitles = [];

// 		$('div > p.title > a').each((_idx, el) => {
// 			const postTitle = $(el).text()
// 			postTitles.push(postTitle)
// 		});

// 		return postTitles;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// getPostTitles()
// .then((postTitles) => console.log(postTitles));