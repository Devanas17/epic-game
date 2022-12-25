import { useEffect } from "react";
import { useState, createContext } from "react";
import { contractABI, contractAddress, transformCharacterData } from "../utils/constant";
import { ethers } from "ethers";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState();
  const [characterNFT, setCharacterNFT] = useState(null);
  const [characters, setCharacters] = useState([]);
  
  const { ethereum } = window;

  const ethereumClient = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContract(contract);
        return contract;
      }
    } catch (error) {
      console.log("Create Post Failed", error);
    }
  };

  useEffect(() => {
    ethereumClient();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: "eth_accounts" });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "5") {
        alert("Please connect to Goerli!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNFTMetadata = async () => {
    try {
      console.log("Checking for Character NFT on address:", currentAccount);

      const txn = await contract.checkIfUserHasNFT();
      if (txn.name) {
        console.log("User has character NFT");
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log("No character NFT found");
      }
    } catch (error) {
      console.log("Fetch NftMetaData", error)
    }
  };

  const getCharacters = async () => {
    try {
      console.log("Getting contract characters to mint");

      const charactersTxn = await contract.getAllDefaultCharacters();
      console.log("charactersTxn:", charactersTxn); 

      const characters = charactersTxn.map((characterData) =>
        transformCharacterData(characterData)
      );
      setCharacters(characters);
    } catch (error) {
      console.error("Something went wrong fetching characters:", error);
    }
  };

  const onCharacterMint = async (sender, tokenId, characterIndex) => {
    console.log(
      `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
    );

    /*
     * Once our character NFT is minted we can fetch the metadata from our contract
     * and set it in state to move onto the Arena
     */
    if (contract) {
      const characterNFT = await contract.checkIfUserHasNFT();
      console.log('CharacterNFT: ', characterNFT);
      setCharacterNFT(transformCharacterData(characterNFT));
    }
  };

  const mintCharacterNFTAction = async (characterId) => {
    try {
      if (contract) {
        console.log('Minting character in progress...');
        const mintTxn = await contract.mintCharacterNFT(characterId);
        await mintTxn.wait();
        console.log('mintTxn:', mintTxn);
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error);
    }
  };


  

  useEffect(() => {
    checkIfWalletIsConnected();
    checkNetwork();
  }, []);
  return (
    <AppContext.Provider
      value={{
        connectWalletAction,
        characterNFT,
        currentAccount,
        setCharacterNFT,
        fetchNFTMetadata,
        contract,
        getCharacters,
        onCharacterMint, 
        characters,
        mintCharacterNFTAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
