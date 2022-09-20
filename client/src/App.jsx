import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { contractAddress } from './utils/constants.js'
import { contractABI } from './utils/constants.js'

function App() {
  const [ currentAccount, setCurrentAccount ] = useState('')
  const [ contract_lottery, setContract_lottery ] = useState('')
  const { ethereum } = window


  /*1. connect wallet */
  const connectWallet = async () => {
    const accounts= await window.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts)
    setCurrentAccount(accounts[0]);
  }
  console.log(currentAccount)

  /*2. making contract */
  const makingContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, [
      {
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
          {
            "internalType": "address payable[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "lottery",
            "type": "uint256"
          }
        ],
        "name": "getWinnerByLottery",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "lotteryHistory",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "lotteryId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "players",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ], signer)
    // const count = await provider.getBlockNumber()
    // console.log(count)
    // console.log(provider)
    // console.log(signer)
    return transactionContract
  }
  // 
  useEffect(() => {
    const interact = async () => {
      try {
        if (ethereum) {
          const lottery = await makingContract()
          console.log(lottery)

          const balance_hex = await lottery.getBalance()
          const balance = parseInt(balance_hex._hex)
          console.log(balance)
          console.log(await lottery.owner())
        }
      } catch (err) {
        console.log(err)
      } 
    }
    interact()
  })
  const enterLottery = async () => {
    const lottery = await makingContract()
    const val = ethers.utils.parseEther('0.02')
    console.log(val._hex)
    // argument: value
    // argument must be a string invalid argument meaning value is invalid
    
    await lottery.enter({ value: ethers.utils.parseUnits("0.02", "ether") })

    console.log(await lottery.getBalance())
    console.log(await lottery.getPlayers())
    // console.log(await lottery.lotteryId)
  }
  const checkBalance = async () => {
    const lottery = await makingContract()
    // console.log(await lottery.getBalance()._hex) not the way mahiway
    const bal = await lottery.getBalance()
    console.log(parseInt(bal._hex))
  }
  const winn = async () => {
    const lottery = await makingContract()
    await lottery.pickWinner()
    const index_hex = await lottery.lotteryId()
    const index = parseInt(index_hex._hex)
    console.log(index)
    const winner = await lottery.lotteryHistory(index - 1)
    console.log(winner)
  }
  return (
    <div>
      <button onClick={connectWallet}>connect wallet</button>
      <button onClick={enterLottery}>enter lottery</button>
      <button onClick={checkBalance}>check balance</button>
      <button onClick={winn}>winner is  </button>
    </div>
  )
}

export default App

/* 
- await 
- - when sometimes running a function and as response will come later so you 
will not receive hence use await.
- - when sometimes returns a promise in console try going for 'await' or '.toJSON()'
- - 
 */

/* 
json import ne rulaya
contract bnanane ne rulaya mujhe
[[][:fulfilled][Contract]], meaning promise needs to be handled like promise or put just await
keep await in mind. 
 */