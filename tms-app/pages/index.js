import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TRANSTU Administration</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <NavBar/>
        <h1>TRANSTU administration managment system </h1>
      </div>
    </div>
  )
}
