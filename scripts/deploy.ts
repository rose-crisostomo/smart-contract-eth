import { ethers } from "hardhat";
import { TestNft } from "../typechain-types";

async function main() : Promise<void> {
    const factory = await ethers.getContractFactory("TestNft");
    const contract = (await factory.deploy()) as TestNft;
    await contract.deployed();

    console.log("Contract deployed to address:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error: unknown) => {
        console.error(error);
        process.exit(1);
    });