import { EchoVerseContext } from "../context/contractContext"
import { useContext } from 'react'


function Connect() {

    const { connectWallet } = useContext(EchoVerseContext);


    return (
        <div>
            <button onClick={connectWallet}>Connect </button>
        </div>
    )
}

export default Connect