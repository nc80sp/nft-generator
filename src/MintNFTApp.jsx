import React, { useState } from 'react';

const ethers = require("ethers")
const CONTRACT_ADDRESS = '0xa0a2f191b9289623c1c33dd18a63fb7ad94fde10'; // あなたのNFTコントラクトアドレスに置き換えてください
const CONTRACT_ABI = [
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)"
];

export default function MintNFTApp() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("MetaMaskがインストールされていません。");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setStatus(`ウォレット接続成功: ${accounts[0]}`);
    } catch (error) {
      setStatus("ウォレット接続に失敗しました。");
    }
  };

  const mintNFT = async () => {
    if (!walletAddress) {
      setStatus("まずウォレットを接続してください。");
      return;
    }
    if (!name) {
      setStatus("名前を入力してください。");
      return;
    }
    try {
      setStatus("ミント中...");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const metadata = {
        name: `${name}の学生証`,
        description: "オープンキャンパス体験用NFT学生証",
        image: `${url}` // 任意の画像URL
      };

      const json = JSON.stringify(metadata);
      const encoded = `data:application/json;base64,${btoa(unescape(encodeURIComponent(json)))}`;

      const tx = await contract.mintNFT(walletAddress, encoded);
      await tx.wait();
      setStatus(`NFTミント成功！ トランザクションハッシュ: ${tx.hash}`);
    } catch (err) {
      setStatus("ミント失敗: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl text-center">
      <h2 className="text-xl font-bold mb-4">NFT学生証をミントしよう！</h2>
      <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        ウォレットを接続する
      </button>
      <div className="mb-4">
        <input
          type="text"
          placeholder="名前を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <br/>
        <input
          type="text"
          placeholder="画像URLを入力"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>
      <button onClick={mintNFT} className="bg-green-500 text-white px-4 py-2 rounded">
        NFTをミントする
      </button>
      <p className="mt-4 text-sm text-gray-700">{status}</p>
    </div>
  );
}
