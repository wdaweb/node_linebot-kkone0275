import axios from 'axios'
// 解析用套件
import * as cheerio from 'cheerio'
// 讓node.js的環境可以使用JQ語法

async function getData () {
  try {
    const { data } = await axios.get('https://www.toy-people.com/')
    const $ = cheerio.load(data)
    $('#toy_news_list .card:not(.NewToyVideo)').each(function () {
      const text = $(this).find('.text h2').text()
      const url = $(this).find('.text h2').attr('href')
      if (text.length > 0) {
        const img = $(this).find('.image a').eq(1).css('background-image').slice(5, -2)
        console.log(text, img, url)
      }
    })
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

getData()
