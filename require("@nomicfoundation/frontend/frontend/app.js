let contract;

const contractAddress = "PASTE_CONTRACT_ADDRESS";

const abi = [
  "function vote(uint index)",
  "function getCandidates() view returns (tuple(string name, uint voteCount)[])"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask!");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  contract = new ethers.Contract(contractAddress, abi, signer);

  loadCandidates();
}

async function loadCandidates() {
  const candidates = await contract.getCandidates();

  let html = "";

  candidates.forEach((c, i) => {
    html += `
      <p>${c.name} - Votes: ${c.voteCount}</p>
      <button onclick="vote(${i})">Vote</button>
    `;
  });

  document.getElementById("candidates").innerHTML = html;
}

async function vote(index) {
  await contract.vote(index);
  alert("Vote casted!");
  loadCandidates();
}
