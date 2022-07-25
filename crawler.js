const axios = require('axios');
const cheerio = require('cheerio');

const getCharacterNames = async () => {
	try {
		const { data } = await axios.get(
			'https://suikoden.fandom.com/wiki/Recruitment_(Suikoden)'
		);
		const $ = cheerio.load(data);
		const characterNames = [];
        const recruitmentInfo = [];

		$('td > b > a').each((_idx, el) => {
			const characterName = $(el).text()
			characterNames.push(characterName)
		});

        $('tr > td:last-child').each((_idx, el) => {
            const recruitCharacter = $(el).text()
            recruitmentInfo.push(recruitCharacter)
        });

		return characterNames;
	} catch (error) {
		throw error;
	}
};

getCharacterNames()
.then((characterNames) => console.log(characterNames));


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

getRecruitmentInfo()
.then((recruitmentInfo) => console.log(recruitmentInfo));

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