import { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AppContext } from './context/context'
import SelectCharacter from './components/selectCharacter/SelectCharacter'

function App() {
  const {connectWalletAction, currentAccount, characterNFT, setCharacterNFT,  fetchNFTMetadata} = useContext(AppContext)
  const renderContent = () => {
    /*
     * Scenario #1
     */
    if (!currentAccount) {
      return (
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
      );
      /*
       * Scenario #2
       */
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
  };

  useEffect(() => {
    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [])

  return (
    <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
        <p className="sub-text">Team up to protect the Metaverse!</p>

        {renderContent()}
      </div>
      
    </div>
  </div>
  )
}

export default App
