/// <reference types="vite/client" />
// from https://docs.metamask.io/wallet/how-to/connect/

interface EIP6963ProviderInfo {
    rdns: string
    uuid: string
    name: string
    icon: string
}

interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo
    provider: EIP1193Provider
}

type EIP6963AnnounceProviderEvent = {
    detail: {
        info: EIP6963ProviderInfo
        provider: Readonly<EIP1193Provider>
    }
}

interface EIP1193Provider {
    isStatus?: boolean
    host?: string
    path?: string
    sendAsync?: (
        request: { method: string; params?: Array<unknown> },
        callback: (error: Error | null, response: unknown) => void
    ) => void
    send?: (
        request: { method: string; params?: Array<unknown> },
        callback: (error: Error | null, response: unknown) => void
    ) => void
    request: (request: {
        method: string
        params?: Array<unknown>
    }) => Promise<unknown>
}

interface ImportMetaEnv {
  readonly VITE_ETHERSCAN_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}