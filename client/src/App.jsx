import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AppContext } from './context/context'

function App() {
  const TWITTER_LINK = "https://twitter.com/webdevanas"
  const TWITTER_HANDLE = "webdevanas"
  const {connectWalletAction} = useContext(AppContext)
  return (
    <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
        <p className="sub-text">Team up to protect the Metaverse!</p>
      </div>
      <div className="connect-wallet-container">
        <img
          src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
          alt="Monty Python Gif"
        />
          <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect Wallet To Get Started
            </button>
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={reactLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built with @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
  )
}

export default App
