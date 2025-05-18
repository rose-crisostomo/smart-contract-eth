// from https://docs.metamask.io/wallet/how-to/connect/

import { ethers } from "ethers";
import { setProviderAndAddress } from "./main.ts";


declare global {
    interface WindowEventMap {
        "eip6963:announceProvider": CustomEvent
    }
}

// Connect to the selected provider using eth_requestAccounts.
const connectWithProvider = async (
    wallet: EIP6963AnnounceProviderEvent["detail"]
) => {
    try {
        await wallet.provider.request({ method: "eth_requestAccounts" });
    } catch (error) {
        alert("Failed to connect to provider: ${error}");
    }
};

// Display detected providers as connect buttons.
export function listProviders(element: HTMLDivElement) {
    window.addEventListener(
        "eip6963:announceProvider",
        async (event: EIP6963AnnounceProviderEvent) => {

            const providerInfo = event.detail.info;

            // TODO: only accept MetaMask for now
            if (providerInfo.name !== "MetaMask" && providerInfo.rdns !== "io.metamask")
                return;

            const provider = event.detail.provider;
            const accounts = await provider.request({ method: "eth_accounts" }) as string[];
            if (accounts.length > 0) { // TODO: testing 1 account for now
                setProviderAndAddress(provider);
                displayAccountDetails(accounts[0], event);
            } else {
                displayProvider(event, element);
            }
        }
    );

    // Notify event listeners and other parts of the dapp that a provider is requested.
    window.dispatchEvent(new Event("eip6963:requestProvider"));
}

function displayAccountDetails(address: string, event: EIP6963AnnounceProviderEvent) {
    document.querySelector<HTMLDivElement>("#disconnected")!.hidden = true;

    displayEthBalance(address, event.detail.provider);
    // getTransactions(address)
}

function displayProvider(event: EIP6963AnnounceProviderEvent, element: HTMLDivElement) {
    document.querySelector<HTMLDivElement>("#connected")!.hidden = true;

    const button = document.createElement("button");
    button.innerHTML = `
                        <img src="${event.detail.info.icon}" alt="${event.detail.info.name}" />
                        <div>${event.detail.info.name}</div>
                    `;
    button.onclick = () => connectWithProvider(event.detail);
    element.appendChild(button);
}

async function displayEthBalance(address: string, provider: Readonly<EIP1193Provider>): Promise<void> {
    try {
        const balanceInWei = await provider.request({ method: "eth_getBalance", params: [address, "latest"] }) as string;
        const balanceEth: string = ethers.formatEther(balanceInWei);

        document.querySelector<HTMLDivElement>("#balance")!.textContent = Number(balanceEth).toFixed(3) + " ETH";
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert("Failed to fetch balance: " + error.message);
        } else {
            alert("Unknown error occurred: " + error);
        }
    }
}

// async function getTransactions(address: string): Promise<void> {
//     const url = `https://api.etherscan.io/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "1") {
//         console.log(`Last 10 transactions for ${address}:`, data.result);
//     } else {
//         if (data.message.includes("No transactions found")) {
//             document.querySelector<HTMLDivElement>("#transactions")!.textContent = "No transactions found.";
//         } else {
//             alert("Error fetching transactions: " + data.message);
//         }
//     }
// }