import { EchoVerseContext } from "../context/contractContext"
import { useContext } from 'react'
import Support from '/support.jpg'


function Connect() {

    const { connectWallet } = useContext(EchoVerseContext);


    return (
        <div className="flex" style={{ height: "100vh" }}>
            <div className="w-3/5 flex flex-col items-center justify-center">
                <div>
                    <h2 className="text-lg pb-8 ">
                        <span className="text-2xl font-bold">
                            Welcome to EchoVerse! </span> <br />
                        Please connect your wallet to continue.
                    </h2>
                </div>
                <button onClick={connectWallet} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Connect </button>
            </div>
            <div className="w-2/5 h-full bg-white" >
                <img src={Support} alt="support" />
            </div>
        </div>
    )
}

export default Connect