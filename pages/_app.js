import Link from 'next/link'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="py-3 flex justify-center">
        <div className="flex items-center justify-between w-full max-w-2xl">
          <Link href="/">
            <a className={`font-bold text-indigo-600 hover:text-indigo-700`}>
              Home
            </a>
          </Link>

          <Link href="/withdraw">
            <a className={`font-bold text-indigo-600 hover:text-indigo-700`}>
              Withdraw
            </a>
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
