import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ethers, Wallet, Contract } from "ethers";
import getEnvVars from "../../environment";
import Web3 from "web3";
import Web3Modal from "web3modal";

const { spcAbi, daiAbi, daiAddress, spcAddress, rpcUrl } = getEnvVars();


interface Web3State {
  account?: string;
  contracts: {
    dai: Contract;
    singlePlayerCommit: Contract;
  };
  provider: any;
  wallet?: Wallet;
  isLoggedIn: boolean;
}

const defaultProvider = ethers.getDefaultProvider(rpcUrl)
console.log(defaultProvider);

const initialState: Web3State = {
  // account: undefined,
  contracts: {
    dai: new ethers.Contract(daiAddress, daiAbi, defaultProvider),
    singlePlayerCommit: new ethers.Contract(
      spcAddress,
      spcAbi,
      defaultProvider
    ),
  },
  provider: defaultProvider,
  // wallet: undefined,
  isLoggedIn: false,
};

export const web3Slice: Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    updateContracts: (state, action) => {
      state.contracts = {
        ...state.contracts,
        ...action.payload
      }
    },
    updateProvider: (state, action) => {
      //state.provider = new ethers.providers.Web3Provider(action.payload.provider);
      state.provider = new ethers.providers.Web3Provider(action.payload);
      console.log("Updated Provider")
      state.contracts.dai.connect(state.provider);
      state.contracts.singlePlayerCommit.connect(state.provider)
      state.isLoggedIn = true;
    },
    updateAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
      console.log("Updated Ccount: " + action.payload)
      state.isLoggedIn = true;
    },
    reset: () => initialState,
  },
});

export const { updateContracts, updateProvider, updateAccount, reset } = web3Slice.actions;

export default web3Slice.reducer;
