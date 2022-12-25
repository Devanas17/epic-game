import { useEffect } from "react"
import {useState, createContext} from "react"
import {contractABI, contractAddress} from "../utils/constant"

export const AppContext = createContext()


export const AppProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [contract, setContract] = useState()

    const {ethereum} = window;

    const checkIfWalletIsConnected = async() => {
        try {
      
            if (!ethereum) {
              console.log('Make sure you have MetaMask!');
              return;
            } else {
              console.log('We have the ethereum object', ethereum);
      
              /*
               * Check if we're authorized to access the user's wallet
               */
              const accounts = await ethereum.request({ method: 'eth_accounts' });
      
              /*
               * User can have multiple authorized accounts, we grab the first one if its there!
               */
              if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorized account:', account);
                setCurrentAccount(account);
              } else {
                console.log('No authorized account found');
              }
            }
          } catch (error) {
            console.log(error);
          }
    }

    const connectWalletAction = async () => {
        try {
    
          if (!ethereum) {
            alert('Get MetaMask!');
            return;
          }
    
         
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
    
        
          console.log('Connected', accounts[0]);
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error);
        }
      };
    

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    return(
        <AppContext.Provider value={{connectWalletAction}}>
            {children}
        </AppContext.Provider>
    )
}