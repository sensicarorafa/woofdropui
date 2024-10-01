import React, { useEffect, useState } from 'react';
import {  TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

const TonWalletDemo: React.FC = () => {
  // Initialize TonConnectUI hook
  const [tonConnectUI] = useTonConnectUI();

  const [walletInfo, setWalletInfo] = useState<any>();
  const [isConnected, setIsConnected] = useState(false);

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

  return (
    <div>
      <h2>TON Wallet Demo</h2>

      {/* Wallet Connection Button */}
      <TonConnectButton />

      {/* Display Wallet Info if connected */}
      {isConnected && walletInfo && (
        <div>
          <h3>Connected Wallet:</h3>
          <p>Address: {walletInfo}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default TonWalletDemo;
