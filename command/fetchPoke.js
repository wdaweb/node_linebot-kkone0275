import axios from 'axios'
// 解析用套件
import * as cheerio from 'cheerio'
// 讓node.js的環境可以使用JQ語法
import template from '../template/course.js'
import writejson from '../utils/writejson.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://www.pokebeach.com/')
    const $ = cheerio.load(data)
    const courses = []
    // let num = 0
    $('.media__container').each(function (index) {
      if (index > 7) return
      // console.log(index)
      const bubble = JSON.parse(JSON.stringify(template))
      // const img = $(this).find('img').attr('src')
      // const title = $(this).find('h2 a').text()
      // const link = $(this).find('h2 a').attr('href')
      bubble.hero.url = $(this).find('img').attr('src')
      bubble.body.contents[0].text = $(this).find('h2 a').text()
      bubble.footer.contents[0].action.uri = $(this).find('h2 a').attr('href')

      // console.log(title)
      // console.log(link)
      // console.log(img)

      // console.log(bubble)

      courses.push(bubble)
    })
    console.log(courses)
    const reply = ({
      type: 'flex',
      altText: 'Pokebeach查詢結果',
      contents: {
        type: 'carousel',
        contents: courses
      }
    })

    event.reply(reply)
    writejson(reply, 'courses')

    // console.log('courses')
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}
