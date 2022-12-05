// import { append } from 'cheerio/lib/api/manipulation.js'
import 'dotenv/config'
import linebot from 'linebot'
import fetchPoke from './command/fetchPoke.js'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  if (event.message.type !== 'text') return

  if (event.message.text === 'poke') {
    fetchPoke(event)
  }
  if (event.message.text === 'test') {
    event.reply(event.message.text)
    // event.reply('test')
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
