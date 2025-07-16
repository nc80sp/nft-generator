import React, { useState } from 'react';
const ethers = require("ethers")

const CONTRACT_ADDRESS = "0x5A4a43EF859ab33840b674a254Ed1AD3d4eed5d0";
const CONTRACT_ABI = [
	  "function hasNFT(address user) external view returns (bool)"
];

export default function ProtectedPage() {
	  const [walletAddress, setWalletAddress] = useState(null);
	  const [hasAccess, setHasAccess] = useState(false);
	  const [status, setStatus] = useState('ウォレットを接続してください');

	  const connectWallet = async () => {
		      if (!window.ethereum) {
			            setStatus("MetaMaskをインストールしてください");
			            return;
			          }
		      const provider = new ethers.providers.Web3Provider(window.ethereum);
		      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		      setWalletAddress(accounts[0]);
		      checkAccess(accounts[0], provider);
		    };

	  const checkAccess = async (address, provider) => {
		      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
		      const result = await contract.hasNFT(address);
		      setHasAccess(result);
		      setStatus(result ? "アクセス可能です！" : "NFTを持っていません。アクセス不可です。");
		    };

	  return (
		      <div className="max-w-xl mx-auto text-center p-6">
		        <h1 className="text-xl font-bold mb-4">限定ページアクセス</h1>
		        {!walletAddress && (
				        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
				          ウォレットを接続
				        </button>
				      )}
		        <p className="mt-4">{status}</p>

		        {hasAccess && (
				        <div className="mt-6 p-4 border rounded bg-green-100">
				          <h2 className="text-lg font-semibold">🎉 限定コンテンツ 🎉</h2>
				          <p>このページは特定のNFTを持っている人だけが見られます。</p>
				        </div>
				      )}
		      </div>
		    );
}

