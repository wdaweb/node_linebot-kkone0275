import axios from 'axios'
// 解析用套件
import * as cheerio from 'cheerio'
// 讓node.js的環境可以使用JQ語法

async function getData () {
  try {
    const { data } = await axios.get('https://www.pokebeach.com/')
    const $ = cheerio.load(data)
    $('.media__container').each(function () {
      const img = $(this).find('img').attr('src')
      const title = $(this).find('h2 a').text()
      const link = $(this).find('h2 a').attr('href')
      console.log(title)
      console.log(link)
      console.log(img)
    })
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

getData()
