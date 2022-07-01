import { useRouter } from 'next/router'
import React from 'react'
import { io } from 'socket.io-client'
import { Header, Footer, FilterBox } from '../components'
import exchanges from '../global/exchanges'

const App = () => {
  const [markets, setMarkets] = React.useState()

  const router = useRouter()
  var dev = true
  const server = dev
    ? 'http://localhost:4000'
    : 'https://intra-arb-bot-test.herokuapp.com/'

  React.useEffect(() => {
    const socket = io(server)
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 4000)
    })
    socket.on('markets', (data) => setMarkets(JSON.parse(data)))
    socket.on('disconnect', () => console.log('Disconnected'))
  }, [])

  var markets_ = [
    {
      pair: 'COMP/USDT',
      low: {
        low_exchange: '',
        price: 46.67,
        exchange: 'wazirx',
      },
      high: {
        high_exchange: '',
        price: 48.02,
        exchange: 'binance',
      },
      diff: '1.350',
    },
    {
      pair: 'KSM/USDT',
      low: {
        low_exchange: '',
        price: 49.3,
        exchange: 'binance',
      },
      high: {
        high_exchange: '',
        price: 50.8,
        exchange: 'wazirx',
      },
      diff: '1.500',
    },
    {
      pair: 'ALCX/USDT',
      low: {
        low_exchange: '',
        price: 23.4,
        exchange: 'binance',
      },
      high: {
        high_exchange: '',
        price: 24.8,
        exchange: 'wazirx',
      },
      diff: '1.400',
    },
  ]
  var account = [
    {
      title: 'Total Trading Count',
      value: 0,
    },
    {
      title: 'Total Profit',
      value: 0,
    },
    {
      title: 'Total Fuel Charge',
      value: 0,
    },
    {
      title: 'Connected Exchange',
      value: 2,
    },
  ]
  return (
    <>
      <Header />
      <div class="px-40">
        {/* 1 */}

        <div class="flex justify-between my-4">
          {account.map((__, k) => {
            var border =
              k == 1
                ? 'border-red-200'
                : k == 2
                ? 'border-violet-200'
                : k == 3
                ? 'border-blue-200'
                : 'border-green-200'
            return (
              <div
                class={`border p-4 flex-1 mr-4 rounded-lg shadow-md shadow-blue-100 ${border}`}
                key={k}
              >
                <p class="text-center">{__.title}</p>
                <p class="text-center font-bold text-2xl">{__.value}</p>
              </div>
            )
          })}
        </div>

        {/* 2 */}
        <div class="flex justify-between items-center mt-10">
          <h1 class="text-2xl text-blue-500">
            Opportunities {markets && '(' + markets.length + ')'}
          </h1>
          <FilterBox
            onChange={(val, type) => {
              var filterMrkts = []
              if (type == 'price') {
                filterMrkts = markets.filter((__, k) => __.low.price < val.id)
              } else {
                filterMrkts = markets.filter((__, k) => __.diff < val.id)
              }
              setMarkets(filterMrkts)
            }}
          />
        </div>
        {markets ? (
          markets.length == 0 ? (
            <p class="text-center text-gray-400 mt-10 border py-5">
              No markets fond
            </p>
          ) : (
            markets.map((_, k) => {
              var logo_low = exchanges().filter((d) => d.id == _.low.exchange)
              var logo_high = exchanges().filter((d) => d.id == _.high.exchange)
              return (
                <div
                  key={k}
                  class="border my-5 p-2 flex justify-around items-center shadow-lg shadow-blue-100 border-blue-200 ListItemRowContainer"
                >
                  <span class="material-symbols-outlined mx-4">
                    currency_exchange
                  </span>
                  <div class="flex-1">
                    <h1 class="text-xl text-left tracking-[.25em]">{_.pair}</h1>
                  </div>

                  <div class="flex border-l ml-5  border-blue-300">
                    <p class="mr-5 bg-red-100 text-red-600 px-5 ml-2 rounded-2xl">
                      BUY
                    </p>
                    <img src={logo_low[0].logo} class="mr-5" />
                    {/* <p>{_.low.exchange}</p> */}
                    <p class="px-2 rounded-2xl ml-2">
                      {_.low.price} <sup class="xs">USDT</sup>
                    </p>
                  </div>

                  <div class="flex ml-5 border-l border-blue-300">
                    <p class="mr-5 bg-green-100 text-green-600 px-5 ml-2 rounded-2xl">
                      SELL
                    </p>
                    <img src={logo_high[0].logo} class="mr-5" />
                    {/* <p>{_.high.exchange}</p> */}
                    <p class="px-2 rounded-2xl ml-2">
                      {_.high.price} <sup class="xs">USDT</sup>
                    </p>
                  </div>
                  <div class="px-5 hideOnHover">
                    <p class="text-sm text-gray-400">Price Diffrence</p>
                    <p class="text-center">{_.diff}</p>
                  </div>

                  {/* Tade now button */}
                  <button
                    className="goToTradeButton"
                    // class="bg-yellow-500 text-white myClassTwo"
                    onClick={() =>
                      router.push({
                        pathname: '/CreateBot',
                        query: {
                          exchange1: _.low.exchange,
                          exchange2: _.high.exchange,
                          market: _.pair,
                        },
                      })
                    }
                  >
                    Trade Now
                    <span class="material-symbols-outlined rotate-90 mx-2 ">
                      straight
                    </span>
                  </button>
                </div>
              )
            })
          )
        ) : (
          <>
            <p class="text-center text-gray-400 mt-10">Looking markets ...</p>
            <div style={{ width: 200, height: 200, margin: 'auto', overflow:'hidden' }}>
              <img
                className="lodaing"
                src="https://firstaidtamworth.com.au/wp-content/themes/business-gravity-pro-premium/assets/images/placeholder/kt-loader-2.gif"
              />
            </div>
          </>
        )}

        <button
          class="bg-blue-600 text-white p-3 flex hover:bg-blue-500  hover:scale-105"
          onClick={() => {
            // ctx.setBotName({name: 'new new name'})
            router.push('CreateBot')
          }}
        >
          Create Bot Now
        </button>
      </div>

      <div class="px-40">
        <h1 class="text-2xl mt-14">How does it work </h1>
        <p class="text-sm mt-4">
          The Inter-exchange Arbitrage bot buys low on one exchange and sells
          high on the other. This bot does not re-balance the wallet.
          Eventually, the wallet needs manual re-balancing for the bot to
          continue. Only use this with small trade amounts. Please ensure you
          fully understand the concept of this bot before using it.
        </p>
      </div>
      <Footer />
    </>
  )
}
export default App
