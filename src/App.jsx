import React, { useState } from 'react';
import { ethers } from 'ethers';

import abi from './abi';

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  
  const contractAddress = '0xDF10a20A7E93bD28b341908df6B02C7E301803d3';
  const contractABI = abi;

  // Function to connect to the user's wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setWalletConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Install MetaMask');
    }
  };

  // Function to update name
  const updateName = async () => {
    if (!contract) return;
    try {
      const tx = await contract.updateName(newName);
      await tx.wait();
      alert('Name updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update name.');
    }
  };

  // Function to update age
  const updateAge = async () => {
    if (!contract) return;
    try {
      const tx = await contract.updateAge(newAge);
      await tx.wait();
      alert('Age updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update age.');
    }
  };

  // Function to get entity details
  const getEntityDetails = async () => {
    if (!contract) return;
    try {
      const details = await contract.getEntityDetails();
      alert(`Name: ${details[0]}, Age: ${details[1]}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <div>
            <input 
              type="text" 
              placeholder="New Name" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
            />
            <button onClick={updateName}>Update Name</button>
          </div>
          <div>
            <input 
              type="number" 
              placeholder="New Age" 
              value={newAge} 
              onChange={(e) => setNewAge(e.target.value)} 
            />
            <button onClick={updateAge}>Update Age</button>
          </div>
          <button onClick={getEntityDetails}>Get Entity Details</button>
        </div>
      )}
    </div>
  );
};

export default App;
