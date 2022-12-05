import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
import flex from './flex.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://apiservice.mol.gov.tw/OdService/download/A17000000J-000007-DR7')
      const course = data.find(courses => courses.BCM_SNO === event.message.text)
      if (course) {
        const replyFlex = JSON.parse(JSON.stringify(flex))
        replyFlex.body.contents[0].text = course.CLASSNAME
        replyFlex.body.contents.push({
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: '訓練時間',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1
                },
                {
                  type: 'text',
                  text: course.TRAINING_PERIOD,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5
                }
              ]
            }
          ]
        })
        replyFlex.footer.contents[0].action.uri = course.URL
        event.reply([{
          type: 'flex',
          altText: '查詢結果',
          contents: {
            type: 'carousel',
            contents: [replyFlex]
          }
        }])
      } else {
        event.reply('找不到課程')
      }
    } catch (error) {
      console.log(error)
      event.reply('發生錯誤，請稍後再試')
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
