import { useEffect, useState } from 'react'

export default function Home() {
  const [hasWalletWarning, setHasWalletWarning] = useState(false)

  const checkIfWalletIsConnected = () => {
    return Boolean(window.ethereum)
  }
  //New addition
  useEffect(() => {
    const hasWallet = checkIfWalletIsConnected()
    setHasWalletWarning(!hasWallet)
  }, [])

  return (
    <div>
      <main>
        {hasWalletWarning ? (
          <p>You will need MetaMask or equivalent to use this app.</p>
        ) : (
          <p>You seem to have a compatible wallet!</p>
        )}
      </main>
    </div>
  )
}
