import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const styles = {
  link: "tracking-wide hover:tracking-widest duration-75 hover:text-blue-500 cursor-pointer",
  header: "px-10 py-5 flex justify-between shadow-sm"
}

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

      <header class={styles.header}>
        <div class="flex">
          <span class="material-symbols-outlined mr-5">flutter_dash</span>
          <h1 class="font-bold">Inter-Exchange Arbitrage Bot</h1>
        </div>
        <div class="w-2/5 flex justify-between">
          <Link href="/Home">
            <p href="#" class={styles.link}>
              Home
            </p>
          </Link>

          <Link href="/Bot">
            <p class={styles.link}>My Bots</p>
          </Link>

          <Link href="/CreateBot">
            <p class={styles.link}>Create Bot</p>
          </Link>

          <Link href="/Exchanges">
            <p class={styles.link}>My Exchanges</p>
          </Link>

          <Link href="/Profile">
            <p class={styles.link}>
              <span class="material-symbols-outlined">account_circle</span>
            </p>
          </Link>
        </div>
      </header>
    </>
  )
}
