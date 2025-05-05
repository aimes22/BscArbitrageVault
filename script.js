const CONTRACT_ADDRESS = "0x9F62B94bDD46D75Ef6e170D75F7E34493FE0Eea8"; // replace with your deployed contract

async function connectWallet() {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      alert("✅ Wallet connected!");
    } catch (error) {
      alert("❌ Connection rejected.");
    }
  } else {
    alert("❌ MetaMask not found.");
  }
}

async function depositBNB() {
  if (!window.ethereum) {
    alert("❌ MetaMask not found.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  const contract = new ethers.Contract(CONTRACT_ADDRESS, [
    "function arbitrage() external payable"
  ], signer);

  try {
    const tx = await contract.arbitrage({ value: ethers.utils.parseEther("0.1") });
    alert("⏳ Transaction sent... waiting");
    await tx.wait();
    alert("✅ BNB deposited to vault.");
  } catch (err) {
    alert("❌ Transaction failed.");
    console.error(err);
  }
}
