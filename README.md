# smart-contract-eth

## Overview
A test application for smart contract development.

Smart contract: "TestNFT (TNFT)"
- A basic ERC-721 token where users can mint only 1 token per wallet
- Maximum supply is 5
- A client web app is available for users to connect to a Metamask wallet and mint a token. They can also view their current balance here.

## Instructions
Setup:
- Run `npm install` on the root folder and in `client/` (for front-end) to install all the necessary packages

To deploy the contract:
- Run `npx hardhat run scripts/deploy.ts`

To run the tests:
- Run `npx hardhat test tests/*`

To run the client web app:
- Run `npm run dev` in `client/`

## Prerequisites
Create your own .env file in the root folder for the ff. variables for using the Sepolia testnet:
- `SEPOLIA_API_URL`
- `METAMASK_PRIVATE_KEY`

## Notes on development
- I only limited the contract to only provide 1 token for ease of testing in the beginning
- Initially, I wanted to support having the mint require a payment but did not have enough time to properly test this capability. I only ever tried that it works when unit testing.
- Some commented codes mean they aren't working properly yet (like transfering tokens from the client app)
- I had chosen Sepolia as the testnet since it seems that Goerli has been deprecated. The development platform I used was Infura (haven't used other alternatives and this was one of the recommendations online).

## Limitations
- Very limited things to do for now, as described in my specifications.

## References:
- https://ethereum.org/en/developers/tutorials/hello-world-smart-contract/
- https://hardhat.org/hardhat-runner/docs/guides/test-contracts
- https://docs.openzeppelin.com/contracts/5.x/api/token/erc721#ERC721