const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const getCharacterInfo = async () => {
  try {
    const { data } = await axios.get(
      'https://suikoden.fandom.com/wiki/Recruitment_(Suikoden)'
    )
    const $ = cheerio.load(data)
    const characterInfo = []
    let recruitmentInfo = []

    $('tr > td:last-child').each((_idx, el) => {
      const recruitCharacter = $(el).text()
      recruitmentInfo.push(recruitCharacter)
    })

    $('td > b > a').each((_idx, el) => {
      const characterName = $(el).text()
      characterInfo.push({ name: characterName })
    })

    recruitmentInfo = recruitmentInfo.map((string) =>
      string.replace(/(\r\n|\n|\r)/gm, '')
    )
    //regex to remove line breaks: https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string

    for (let i = 0; i < characterInfo.length; i++) {
      characterInfo[i].recruitment = recruitmentInfo[i]
    }

    return characterInfo
  } catch (error) {
    throw error
  }
}

getCharacterInfo().then((characterInfo) => {
  fs.writeFile(
    '/Users/ashleyvalentine/Documents/code/suikoden-api/characters.json',
    JSON.stringify(characterInfo),
    (err) => {
      if (err) console.log(err)
      else {
        console.log('File written successfully\n')
      }
    }
  )
})

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
