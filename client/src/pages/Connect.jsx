import { EchoVerseContext } from "../context/contractContext"
import { useContext } from 'react'


function Connect() {

    const { connectWallet } = useContext(EchoVerseContext);


    return (
        <div style={{ height: "80vh" }} className=" w-full flex flex-col items-center justify-center">
            <div>
                <h2 className="text-lg pb-8">
                    Welcome to EchoVerse! Please connect your wallet to continue.
                </h2>
            </div>
            <button onClick={connectWallet} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Connect </button>
        </div>
    )
}

export default Connect