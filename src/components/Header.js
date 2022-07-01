import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>

      <header class="px-40 py-5 flex justify-between shadow-sm">
        <div class="flex">
          <span class="material-symbols-outlined mr-5">flutter_dash</span>
          <h1 class="font-bold">Inter-Exchange Arbitrage Bot</h1>
        </div>
        <div class="w-2/5 flex justify-between">
          <Link href="/">
            <p
              href="#"
              class="hover:tracking-widest duration-75 hover:text-blue-500 cursor-pointer"
            >
              Home
            </p>
          </Link>

          <Link href="/Bot">
            <p class="hover:tracking-widest duration-75 hover:text-blue-500 cursor-pointer ">
              My Bots
            </p>
          </Link>

          <Link href="/CreateBot">
            <p class="hover:tracking-widest duration-75 hover:text-blue-500 cursor-pointer">
              Create Bot
            </p>
          </Link>

          <Link href="/Exchanges">
            <p class="hover:tracking-widest duration-75 hover:text-blue-500 cursor-pointer ">
              My Exchanges
            </p>
          </Link>
        </div>
      </header>
    </>
  )
}