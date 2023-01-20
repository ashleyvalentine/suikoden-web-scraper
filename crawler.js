const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const getCharacterDesc = async () => {
  try {
    const { data } = await axios.get(
      'https://suikoden.fandom.com/wiki/Suikoden#Characters'
    )
    const $ = cheerio.load(data)
    let characterDesc = []

    $('h3 + ol > li').each((_idx, el) => {
      const description = $(el).text()
      characterDesc.push(description)
    })

    characterDesc = characterDesc.map((el) => (el = el.split('- ')[1]))

    return characterDesc
  } catch (error) {
    throw error
  }
}

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
      characterInfo.push(characterName)
    })

    recruitmentInfo = recruitmentInfo.map((string) =>
      string.replace(/(\r\n|\n|\r)/gm, '')
    )
    //regex to remove line breaks: https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string

    const characterDesc = await getCharacterDesc()

    for (let i = 0; i < characterInfo.length; i++) {
      characterInfo[i] = {
        id: i,
        name: characterInfo[i],
        description: characterDesc[i],
        recruitment: recruitmentInfo[i]
      }
    }

    return characterInfo
  } catch (error) {
    throw error
  }
}

const get108Stars = async () => {
  try {
    const { data } = await axios.get(
      'https://suikoden.fandom.com/wiki/108_Stars_of_Destiny'
    )
    const $ = cheerio.load(data)
    const starsOfDestiny = []
    let characterImageLinks = []

    $('tr:nth-child(2n+1) > td:nth-child(1) > a').each((_idx, el) => {
      const star = $(el).text()
      starsOfDestiny.push({ star: star })
    })

    $(
      'tr:nth-child(2n+1) > td:nth-child(2) > div > div:nth-child(2) > p > a:nth-child(1)'
    ).each((_idx, el) => {
      const link = $(el).attr('href')
      characterImageLinks.push(link)
    })

    characterImageLinks = characterImageLinks.map(
      (el) => (el = el.split('revision/')[0])
    )

    for (let i = 0; i < starsOfDestiny.length; i++) {
      starsOfDestiny[i] = {
        ...starsOfDestiny[i],
        image: characterImageLinks[i]
      }
    }

    return starsOfDestiny
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

get108Stars().then((starsOfDestiny) => {
  fs.writeFile(
    '/Users/ashleyvalentine/Documents/code/suikoden-api/starsOfDestiny.json',
    JSON.stringify(starsOfDestiny),
    (err) => {
      if (err) console.log(err)
      else {
        console.log('Second file written successfully\n')
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
