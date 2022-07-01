import { useContext, useState } from 'react'
import ccxt from 'ccxt'
import { DropDown, Input, Header, Alert } from '../components'
import exchanges from '../global/exchanges'
import DataContext from '../store/DataContext'
import { useRouter } from 'next/router'

export default function CreateBot() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState()
  const [alert, setAlert] = useState()

  const [market1exchanges, setMarket1exchanges] = useState([])
  const [market2exchanges, setMarket2exchanges] = useState([])

  const ctx = useContext(DataContext)
  const router = useRouter()
  const loadMarkets = async (exchange_, list) => {
    let mrkts = await new ccxt[exchange_.id]().fetchMarkets()

    // console.log("market length", mrkts.length);
    if (list == 'first')
      setMarket1exchanges(mrkts.filter((_) => _.quote == 'USDT'))
    if (list == 'second')
      setMarket2exchanges(mrkts.filter((_) => _.quote == 'USDT'))
  }
  return (
    <>
      {alert && (
        <Alert {...alert} onClose={() => setAlert({ ...alert, show: false })} />
      )}
      <Header />

      <div class="px-40 py-10">
        <h1 class="text-3xl mt-10">Create Bot</h1>
        <div
          class={
            show ? 'hidden' : 'my-10 bg-white p-10 shadow-2xl shadow-blue-300'
          }
        >
          <Input
            placeholder="name"
            type="text"
            title="Bot Name"
            onChange={(val) => setForm({ ...form, name: val })}
          />
          <h1>First Market</h1>
          <DropDown
            class="w-2/5 my-5"
            placeholder="Account"
            title="Account"
            onChange={(val) => {
              setForm({ ...form, exchange1: val })
              loadMarkets(val, 'first')
            }}
            options={exchanges().filter(
              (_) => _.id == 'binance' || _.id == 'wazirx',
            )}
          />
          <DropDown
            class="w-2/5 my-5"
            placeholder="Market"
            title="Market"
            onChange={(val) => setForm({ ...form, market1: val })}
            options={market1exchanges}
          />
          <h1>Second Market</h1>
          <DropDown
            class="w-2/5 my-5"
            placeholder="Account"
            title="Account"
            onChange={(val) => {
              setForm({ ...form, exchange2: val })
              loadMarkets(val, 'second')
            }}
            options={exchanges().filter(
              (_) => _.id == 'binance' || _.id == 'wazirx',
            )}
          />
          <DropDown
            class="w-2/5 my-5"
            placeholder="Market"
            title="Market"
            onChange={(val) => setForm({ ...form, market2: val })}
            options={market2exchanges}
          />
          <Input
            placeholder="100"
            type="text"
            title="Trade Amount"
            onChange={(val) => setForm({ ...form, tradeAmount: val })}
          />
          <Input
            placeholder="15%"
            type="text"
            title="Profit"
            onChange={(val) => setForm({ ...form, profitPercentage: val })}
          />

          <button
            class="bg-blue-600 text-white p-3 flex my-10"
            onClick={() => {
              // if (form) ctx.createBot(form)
              // setAlert({
              //   show: true,
              //   title: 'Sorry!',
              //   type: 'warning',
              //   message: "Demo version can't add new Bot",
              // })
              var STORAGE_BOT = 'bots_test'
              var bots = localStorage.getItem(STORAGE_BOT)

              if (bots) {
                // bots = { bots: [...bots, form] }
                // localStorage.setItem(STORAGE_BOT, JSON.stringify(bots))

                // for demo
                setAlert({
                  show: true,
                  title: 'Sorry!',
                  type: 'warning',
                  message: "Demo version can only add one Bot",
                })
              } else {
                bots = { bots: [form] }
                setAlert({
                  show: true,
                  title: 'Bot created',
                  type: 'success',
                  message: 'Bot successfully created',
                })
                localStorage.setItem(STORAGE_BOT, JSON.stringify(bots))
              }
              // console.log('==', bots)
              // router.push('/Bot')
            }}
          >
            Create Bot
            {/* <span class="material-symbols-outlined ml-3">currency_exchange</span> */}
          </button>
        </div>
      </div>
    </>
  )
}
