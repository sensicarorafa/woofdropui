import React, { useEffect, useState } from 'react';
import {  TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import TonWeb from 'tonweb';
import { Buffer } from 'buffer';

const TonWalletDemo: React.FC = () => {
  // Initialize TonConnectUI hook
  const [tonConnectUI] = useTonConnectUI();

  const [walletInfo, setWalletInfo] = useState<any>();
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<any>(0);


  // Event listener to track wallet connection status
  useEffect(() => {
    const handleStatusChange = () => {
      const wallet = tonConnectUI.wallet;
      if (wallet) {
        setWalletInfo(wallet);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };

    tonConnectUI.onStatusChange(handleStatusChange);

    // Cleanup the event listener
    return () => {
      tonConnectUI.onStatusChange(handleStatusChange);
    };
  }, [tonConnectUI]);

  // Handle disconnecting the wallet
  const disconnectWallet = () => {
    tonConnectUI.disconnect();
    setIsConnected(false);
    setWalletInfo(null);
  };



  useEffect(() => {
    // Function to fetch wallet balance
    const fetchBalance = async () => {
      if (tonConnectUI.wallet) {
        try {
          window.Buffer = Buffer;
          const walletAddress = tonConnectUI.wallet.account.address;
          console.log("walletAddress", walletAddress)

          const tonweb = new TonWeb(); // Initialize TonWeb instance
    
          const balanceInNanoTON = await tonweb.provider.getBalance(walletAddress); // Get balance in NanoTON
        
          const balanceInTON = TonWeb.utils.fromNano(balanceInNanoTON); // Convert from NanoTON to TON
 
          setBalance(balanceInTON);  // Set the balance
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();  // Call the fetchBalance function when the component mounts
  }, [walletInfo]);

  return (
    <div className='text-white'>
      {/* <h2>TON Wallet Demo</h2> */}

      {/* Wallet Connection Button */}
      <TonConnectButton />
      {/* <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
            </div> */}
      {/* Display Wallet Info if connected */}
   
      {isConnected && walletInfo && (
        <div>
          {/* <h3>Connected Wallet:</h3> */}
          {/* <p>Address: {walletInfo.account.address}</p> */}
          {/* <button onClick={disconnectWallet}>Disconnect Wallet</button> */}
          {balance}
        </div>
      )}
    </div>
  );
};

export default TonWalletDemo;
