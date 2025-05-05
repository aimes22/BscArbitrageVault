const CONTRACT_ADDRESS = "0x9F62B94bDD46D75Ef6e170D75F7E34493FE0Eea8"; // your contract address

document.getElementById("connectBtn").onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      alert("✅ Wallet connected!");
    } catch (error) {
      alert("❌ Connection rejected.");
    }
  } else {
    alert("❌ MetaMask not found.");
  }
};

document.getElementById("depositBtn").onclick = async () => {
  if (typeof window.ethereum === "undefined") {
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
    alert("⏳ Transaction sent...");
    await tx.wait();
    alert("✅ BNB deposited.");
  } catch (err) {
    console.error(err);
    alert("❌ Transaction failed.");
  }
};
