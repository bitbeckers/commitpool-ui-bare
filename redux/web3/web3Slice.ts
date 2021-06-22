import { createSlice, Slice } from "@reduxjs/toolkit";
import { ethers, Wallet, Contract } from "ethers";
import getEnvVars from "../../environment";

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

// const defaultProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
// const defaultProvider = ethers.getDefaultProvider("https://polygon-mumbai.infura.io/v3/fb9dd1f3476f44ad92158c24ba5120c6")
const defaultProvider = ethers.getDefaultProvider(rpcUrl)

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
    updateProvider: (state, action) => {
      state.provider = new ethers.providers.Web3Provider(action.payload.provider);
      state.contracts.dai.connect(state.provider);
      state.contracts.singlePlayerCommit.connect(state.provider)
    },
    updateAccount: (state, action) => {
      state.account = action.payload;
      state.isLoggedIn = true;
    },
    reset: () => initialState,
  },
});

export const { updateProvider, updateAccount, reset } = web3Slice.actions;

export default web3Slice.reducer;
