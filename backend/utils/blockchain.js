const { create } = require('ipfs-http-client');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'RedactOwnershipABI.json'), 'utf8'));
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const contract = new web3.eth.Contract(contractABI, contractAddress);

const storeOnIPFS = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const { cid } = await ipfs.add(file);
  return cid.toString();
};

const registerUser = async (username, email, password, userAddress) => {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.register(username, email, password).send({ from: accounts[0] });
};

const uploadFileToBlockchain = async (ipfsHash, userAddress) => {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.uploadFile(ipfsHash).send({ from: accounts[0] });
};

const verifyFileOwnership = async (ipfsHash, userAddress) => {
  return await contract.methods.verifyOwnership(ipfsHash).call({ from: userAddress });
};

module.exports = { storeOnIPFS, registerUser, uploadFileToBlockchain, verifyFileOwnership };
