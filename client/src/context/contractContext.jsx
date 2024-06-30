import { useEffect, useState, createContext } from 'react'
import { ethers } from "ethers";
import abi from "../utils/abi.json";
import contractAddress from "../utils/contractAddress";

export const EchoVerseContext = createContext()


export const EchoVerseProvider = ({ children }) => {

    const [chainId, setChainId] = useState("")

    const [currentAccount, setCurrentAccount] = useState("")
    const [echoVerseContract, setEchoVerseContract] = useState("");

    const [errorPage, setErrorPage] = useState(false)
    // const contractAddress = "0x585f59c9143A4E4f94eE34Bba45330b99a27f4Fe"
    const contractABI = abi;
    const { ethereum } = window;


    useEffect(() => {

        const getContract = () => {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const votSysContract = new ethers.Contract(contractAddress, contractABI, signer);

            setEchoVerseContract(votSysContract);
        }
        if (ethereum && currentAccount)
            getContract();
    }, [ethereum, contractABI, currentAccount])



    useEffect(() => {

        if (ethereum) {
            ethereum.on("accountsChanged", (accounts) => {

                setCurrentAccount(accounts[0]);
            })

        }
        else
            console.log("No metamask!");

        return () => {
            // ethereum.removeListener('accountsChanged');

        }
    }, [ethereum])






    useEffect(() => {
        const checkIfWalletIsConnected = async () => {

            try {

                if (!ethereum) {
                    console.log("Metamask not found")
                    return;
                }
                else
                    console.log("we have etherium object");

                const accounts = await ethereum.request({ method: "eth_accounts" });  //check if there are accounts connected to the site

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Found an authorized account:", account);
                    // if (currentAccount !== "")
                    setCurrentAccount(account)

                    // votingSystem();

                }
                else {
                    setCurrentAccount("")
                    console.log("No authorized accounts found!");
                }


                const curr_chainId = await ethereum.request({ method: 'eth_chainId' });
                setChainId(curr_chainId)

                ethereum.on('chainChanged', handleChainChanged);


                // Reload the page when they change networks
                // eslint-disable-next-line no-inner-declarations, no-unused-vars
                function handleChainChanged(_chainId) {
                    window.location.reload();
                }

            } catch (error) {
                console.log(error);
            }
        }

        checkIfWalletIsConnected();
    }, [currentAccount, contractABI, ethereum])



    const connectWallet = async () => {
        try {

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" }); // request connection with accounts
            // console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            // const chainId = await ethereum.request({ method: 'eth_chainId' });

        }
        catch (e) {
            console.log(e);
        }
    }


    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xf35a' }], // Check networks.js for hexadecimal network ids
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (chainId !== "0xf35a") {
            switchNetwork()
        }
    }, [chainId, currentAccount])


    const backendURL = "https://echoverse-94io.onrender.com";

    return (
        <EchoVerseContext.Provider
            value={{
                chainId, backendURL, currentAccount, echoVerseContract, errorPage, switchNetwork, connectWallet, contractAddress
            }}
        >
            {children}
        </EchoVerseContext.Provider>
    )
}

