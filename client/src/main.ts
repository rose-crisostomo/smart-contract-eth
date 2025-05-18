import './style.css'
import { listProviders } from "./providers.ts"
import { ethers } from "ethers"
import { BrowserProvider } from "ethers/providers";
import type { JsonRpcSigner } from 'ethers';
import type { Contract } from 'ethers';

let provider: Readonly<EIP1193Provider> | null = null;
let walletAddress: string | null = null;
let signer: JsonRpcSigner;
let contract: Contract;
let signerAddress: string;
let balance: number;

export async function setProviderAndAddress(p: Readonly<EIP1193Provider>, a: string) {
    provider = p;
    walletAddress = a;

    signer = await new BrowserProvider(provider as EIP1193Provider).getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
    signerAddress = await signer.getAddress();

    getBalance();
    configMintButton();
}

const contractAbi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function mint(uint256 quantity)",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
];
const contractAddress = "0x7570c2D07EEe5B0E1A0AC3eBDf833b9a01ee368C";

listProviders(document.querySelector<HTMLDivElement>("#providerButtons")!)

async function getBalance() {
    try {
        const currBalance = await contract.balanceOf(signerAddress);
        balance = currBalance;

        const nftBalanceDiv = document.getElementById("nft-balance");
        nftBalanceDiv!.textContent = currBalance.toString();
    }
    catch (error: unknown) {
        alert(error);
    }
}

async function configMintButton() {
    const mintButton = document.getElementById("mint") as HTMLButtonElement;
    mintButton.onclick = async () => {
        try {
            await contract.mint(1);
        }
        catch (error: unknown) {
            alert(error);
        }
    }
}

async function getTokenId() {
    try {
        if (balance == 0) {
            alert("You do not have any tokens.");
            return;
        }

        let token = await contract.tokenOfOwnerByIndex(signerAddress, 0); // get first token
        alert("Your token ID is " + token.toString());
    } catch (error: unknown) {
        alert(error);
    }
}

async function transferToken(to: string, tokenId: ethers.BigNumberish) {
    try {
        await contract.safeTransferFrom(signerAddress, to, tokenId);
        alert("Transferred successfully");
    } catch (error: unknown) {
        alert(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const getTokenButton = document.getElementById("get-token");
    if (getTokenButton) {
        getTokenButton.addEventListener('click', getTokenId);
    } else {
        console.error('Button element with ID "get-token" not found.');
    }

    // const transferForm = document.getElementById("transfer-form") as HTMLFormElement;
    // transferForm.addEventListener("submit", (event) => {
    //     event.preventDefault();

    //     let toAddress: string = (document.getElementById("to-address") as HTMLInputElement).value;
    //     let tokenId: string = (document.getElementById("token-id") as HTMLInputElement).value;
    //     console.log(toAddress, tokenId)
    //     transferToken(toAddress, tokenId);

    //     transferForm.reset();
    // });
});