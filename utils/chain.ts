interface SupportedChains {
  [chainId: string]: Network;
}

export const supportedChains: SupportedChains = {
  "0x1": {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    network_id: 1,
    chain_id: "0x1",
    providers: ["walletconnect", "torus"],
    rpc_url: `https://mainnet.infura.io/v3/3c072dd341bb4e45858038e146195ae1`,
    block_explorer: "https://etherscan.io",
  },
  "0x4": {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    network_id: 4,
    chain_id: "0x4",
    providers: ["walletconnect", "torus"],
    rpc_url: `https://rinkeby.infura.io/v3/3c072dd341bb4e45858038e146195ae1`,
    block_explorer: "https://rinkeby.etherscan.io",
  },
  "0x2a": {
    name: "Ethereum Kovan",
    short_name: "kov",
    chain: "ETH",
    network: "kovan",
    network_id: 42,
    chain_id: "0x2a",
    providers: ["walletconnect", "torus"],
    rpc_url: `https://kovan.infura.io/v3/3c072dd341bb4e45858038e146195ae1`,
    block_explorer: "https://kovan.etherscan.io",
  },
  "0x89": {
    name: "Matic",
    short_name: "matic",
    chain: "MATIC",
    network: "matic",
    network_id: 137,
    chain_id: "0x89",
    providers: ["walletconnect", "torus"],
    rpc_url:
      "https://polygon-mainnet.infura.io/v3/3c072dd341bb4e45858038e146195ae1",
    block_explorer: "https://polygonscan.com",
  },
  "0x13881": {
    name: "Matic Mumbai",
    short_name: "mum",
    chain: "MATIC",
    network: "mumbai",
    network_id: 80001,
    chain_id: "0x13881",
    providers: ["walletconnect", "torus"],
    rpc_url:
      "https://polygon-mumbai.infura.io/v3/3c072dd341bb4e45858038e146195ae1",
    block_explorer: "https://mumbai.polygonscan.com",
  },
};

export const chainByID = (chainId: string): Network => supportedChains[chainId];
export const chainByNetworkId = (networkId: string): Network => {
  const idMapping: any = {
    1: supportedChains["0x1"],
    4: supportedChains["0x4"],
    42: supportedChains["0x2a"],
    137: supportedChains["0x89"],
    80001: supportedChains["0x13881"],
  };

  return idMapping[networkId];
};
