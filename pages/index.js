import Web3 from 'web3'
import { useEffect, useRef, useState } from 'react'

function MainButton({ onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex rounded-md shadow disabled:opacity-50`}
    >
      <span
        className={`inline-flex items-center justify-center px-5 py-3 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
      >
        {label}
      </span>
    </button>
  )
}

function AddressInput({ id, label, value, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`address-${id}`}>{label}</label>
      <input
        id={`address-${id}`}
        value={value}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onBlur(event.target.value)}
        className={'form-input rounded px-4 py-3'}
        placeholder="Wallet Address"
      />
      {error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <p className="text-sm">&nbsp;</p>
      )}
    </div>
  )
}

function SplitInput({ id, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`split-${id}`}>Split</label>
      <input
        id={`split-${id}`}
        value={value}
        type="number"
        onChange={(event) => onChange(Number(event.target.value))}
        className={'form-input rounded px-4 py-3'}
        placeholder={1}
        min={1}
        step={1}
      />
    </div>
  )
}

function PartnerInput({ address, split }) {
  return (
    <div className={'flex'}>
      <div className={'mr-3 w-full'}>
        <AddressInput
          id={address.id}
          label={address.label}
          value={address.value}
          onChange={address.onChange}
          onBlur={address.onBlur}
          error={address.error}
        />
      </div>
      <div className={'w-1/5'}>
        <SplitInput
          id={split.id}
          value={split.value}
          onChange={split.onChange}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const web3 = useRef(null)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [hasWalletWarning, setHasWalletWarning] = useState(false)
  const [partners, setPartners] = useState([
    {
      id: '1',
      label: 'Partner A',
      address: '',
      error: '',
      split: 1,
    },
    {
      id: '2',
      label: 'Partner B',
      address: '',
      error: '',
      split: 1,
    },
  ])

  const checkIfWalletIsConnected = () => {
    return Boolean(window.ethereum)
  }

  useEffect(() => {
    const hasWallet = checkIfWalletIsConnected()
    setHasWalletWarning(!hasWallet)
  }, [])

  useEffect(() => {
    if (web3.current) {
      return
    }

    if (!checkIfWalletIsConnected()) {
      return
    }

    web3.current = new Web3(window.ethereum)
    web3.current.eth.getBlock('latest').then((block) => console.log(block))
  }, [])

  const connectWallet = async () => {
    if (!checkIfWalletIsConnected()) {
      return
    }

    try {
      const { ethereum } = window

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const addressInputs = partners.map((partner, index) => {
    return (
      <PartnerInput
        address={{
          id: partner.id,
          label: partner.label,
          value: partner.address,
          onChange: (value) => {
            setPartners((oldPartnersState) => {
              const newPartnersState = [...oldPartnersState]
              newPartnersState[index].address = value

              return newPartnersState
            })
          },
          onBlur: (value) => {
            setPartners((oldPartnersState) => {
              const isValueAddress = web3.current.utils.isAddress(value)
              const newPartnersState = [...oldPartnersState]
              newPartnersState[index].error = isValueAddress
                ? ''
                : 'Enter a valid wallet address'

              return newPartnersState
            })
          },
          error: partner.error,
        }}
        split={{
          id: partner.id,
          value: partner.split,
          onChange: (value) => {
            setPartners((oldPartnersState) => {
              const newPartnersState = [...oldPartnersState]
              newPartnersState[index].split = value

              return newPartnersState
            })
          },
        }}
        key={partner.label}
      />
    )
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-start py-8 pt-12  px-6 md:pt-20 text-zinc-700">
        <h1 className="text-7xl md:text-6xl font-extrabold text-indigo-600 mb-3 pb-2">
          Partnerly
        </h1>
        <section className="max-w-md text-center mb-12">
          <p className="text-xl">
            Partnerly creates a smart contract for you and your partner that
            distributes the payments to the partnership contract in a
            predetermined split ratio.
          </p>
          {hasWalletWarning && (
            <p className="mt-4 text-red-600">
              You will need Metamask or equivalent to use this app.
            </p>
          )}
          {!currentAccount && (
            <div className="mt-4">
              <MainButton onClick={connectWallet} label={'Connect Wallet'} />
            </div>
          )}
        </section>

        {currentAccount && (
          <div className="grid grid-cols-1 gap-3 mb-6">{addressInputs}</div>
        )}
      </main>
    </div>
  )
}
