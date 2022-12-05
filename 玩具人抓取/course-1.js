import axios from 'axios'
// 解析用套件
import * as cheerio from 'cheerio'

// export default async (event) => {
//   try {
//     const { data } = await axios.get('https://wdaweb.github.io/')
//     const $ = cheerio.load(data)
//     const courses = []
//     $('.card').each(function () {
//       console.log($(this).find('.text h2').text())
//     })
//     event.reply(courses.join('\n'))
//   } catch (error) {
//     event.reply('發生錯誤')
//   }
// }

async function getData () {
  try {
    const { data } = await axios.get('https://www.toy-people.com/')
    const $ = cheerio.load(data)
    $('#toy_news_list .card:not(.NewToyVideo)').each(function () {
      const text = $(this).find('.text h2').text()
      if (text.length > 0) {
        const img = $(this).find('.image a').eq(1).css('background-image').slice(5, -2)
        console.log(text, img)
      }
    })
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

getData()
