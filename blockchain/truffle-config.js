module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        "YOUR_MNEMONIC",
        `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`
      ),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
