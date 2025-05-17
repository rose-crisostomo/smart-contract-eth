import dotenv from "dotenv"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage"

dotenv.config()
const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
   solidity: "0.8.28", // latest supported by HardHat https://hardhat.org/hardhat-runner/docs/reference/solidity-support
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}

export default config;