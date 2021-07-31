import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ethers, Wallet, Contract } from "ethers";
import getEnvVars from "../../environment";
import Web3Modal from "web3modal";

const { spcAbi, daiAbi, daiAddress, spcAddress, rpcUrl } = getEnvVars();

export interface Web3State {
  account?: string;
  contracts: {
    dai: Contract;
    singlePlayerCommit: Contract;
  };
  transactions: Record<TransactionHash, TransactionDetails>;
  provider: any;
  wallet?: Wallet;
  isLoggedIn: boolean;
  web3Modal?: Web3Modal;
  chain?: Network;
}

const defaultProvider = ethers.getDefaultProvider(rpcUrl);
console.log(defaultProvider);

const initialState: Web3State = {
  contracts: {
    dai: new ethers.Contract(daiAddress, daiAbi, defaultProvider),
    singlePlayerCommit: new ethers.Contract(
      spcAddress,
      spcAbi,
      defaultProvider
    ),
  },
  transactions: {},
  provider: defaultProvider,
  isLoggedIn: false,
};

export const web3Slice: Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    updateContracts: (state, action) => {
      state.contracts = {
        ...state.contracts,
        ...action.payload,
      };
    },
    updateProvider: (state, action) => {
      console.log("updating provider: ", action.payload);
      state.provider = action.payload;
    },
    updateAccount: (state, action: PayloadAction<string>) => {
      console.log("updating account: ", action.payload);

      state.account = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      console.log("updating logged in: ", action.payload);

      state.isLoggedIn = action.payload;
    },
    updateChain: (state, action: PayloadAction<Network>) => {
      console.log("updating chain: ", action.payload);

      state.chain = action.payload;
    },
    updateWeb3Modal: (state, action: PayloadAction<Web3Modal>) => {
      console.log("updating web3modal: ", action.payload);

      state.web3Modal = action.payload;
    },
    updateTransactions: (state, action: PayloadAction<TransactionDetails>) => {
      const { hash } = action.payload.txReceipt;
      if (hash) {
        console.log("updating transactionRecords: ", action.payload);
        state.transactions[hash] = action.payload;
      }
    },
    reset: () => initialState,
  },
});

export const {
  updateContracts,
  updateProvider,
  updateAccount,
  updateChain,
  updateWeb3Modal,
  updateTransactions,
  setLoggedIn,
  reset,
} = web3Slice.actions;

export default web3Slice.reducer;
