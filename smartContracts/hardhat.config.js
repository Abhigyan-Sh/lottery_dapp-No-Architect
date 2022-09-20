/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/s-1xX3e5NF-ogcVIFV9z12SejE3sOAbs',
      accounts: ['915b480d15159944bc358662296b74bb9f41684a2b439067170a6e71345f40d5']
    }
  }
};
