import { expect } from "chai";
import { ethers } from "hardhat"
import { TestNft } from "../typechain-types";
import { BigNumber, BigNumberish } from "ethers";

describe("TestNft", function () {
    let contract: TestNft;
    let owner: any;
    let signer1: any;
    let signer2: any;
    let mintPrice: BigNumber; // in wei

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("TestNft");
        contract = (await factory.deploy()) as TestNft;
        await contract.deployed();

        [owner, signer1, signer2] = await ethers.getSigners();
        // mintPrice = ethers.BigNumber.from((await contract.MINT_PRICE()).toString());
    });

    it("should mint 1 token", async function () {
        await contract.connect(signer1).mint(1/*, { value: mintPrice } */);

        expect((await contract.balanceOf(signer1.address)).toString()).to.equal("1");
    });

    // it("should revert for insufficient payment", async function () {
    //     const insufficientPayment = 0;
    //     try {
    //         await contract.connect(signer1).mint(1, { value: insufficientPayment } );
    //         throw new Error("Transaction should have reverted");
    //     } catch (err: any) {
    //         expect(err.message).to.include("Insufficient payment").and.include("reverted");
    //     }
    // });

    it("should revert when maximum supply is reached", async function () {
        let maxSupply = Number((await contract.MAX_SUPPLY()).toString());
        const signers = await ethers.getSigners();

        try {
            for (const signer of signers.slice(0, maxSupply + 1)) {
                await contract.connect(signer).mint(1/*, { value: mintPrice } */);
            }
            throw new Error("Transaction should have reverted");
        } catch (err: any) {
            expect(err.message).to.include("Maximum supply").and.include("reverted");
        }
    });

    it("should revert when maximum tokens per wallet is reached", async function () {
        // mint 1 token
        await contract.connect(signer1).mint(1/*, { value: mintPrice } */);

        let overQuantity = Number((await contract.MAX_PER_WALLET()).toString());
        // let payment = mintPrice.mul(overQuantity);

        try {
            await contract.connect(signer1).mint(overQuantity/*, { value: payment } */);
            throw new Error("Transaction should have reverted");
        } catch (err: any) {
            expect(err.message).to.include("Maximum tokens per wallet").and.include("reverted");
        }
    });
});