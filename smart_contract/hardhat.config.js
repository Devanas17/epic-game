require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const MATIC_RPC_URL = process.env.MATIC_RPC_URL;

module.exports = {
  defaultNetwork: "hardhat",
  allowUnlimitedContractSize: true,
  networks: {
    // goerli: {
    //   url: GOERLI_API_KEY,
    //   accounts: [GOERLI_PRIVATE_KEY],
    // },
    matic: {
      url: MATIC_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 80001,
    },
  },
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
