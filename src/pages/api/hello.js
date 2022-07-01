// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use strict'
const ccxt = require('ccxt')

export default async function handler(req, res) {
  const {
    query: { pair1, pair2 },
  } = req
  
  let binance = new ccxt.binance()
  let wazirx = new ccxt.wazirx()
  // let data_binance = await binance.fetchTrades(pair || 'ETH/USDT')
  let pair1_data = await binance.fetchOHLCV(
    pair1 ,
    '1m',
    undefined,
    1,
  )
  let pair2_data = await wazirx.fetchOHLCV(
    pair2,
    '1m',
    undefined,
    1,
  )

  // let test = await huobi.loadMarket()

  // handle level2 orderbook snapshots

  // res.status(200).json({name: 'ami'})
  res.status(200).json({ data: { pair1: pair1_data, pair2: pair2_data } })
}
