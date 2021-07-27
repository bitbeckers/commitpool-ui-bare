import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Torus from "@toruslabs/torus-embed";
import getEnvVars from '../../environment';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"

const { host, chainId, networkName, debug } = getEnvVars();

import {
  updateProvider,
  updateAccount,
  reset,
} from "../../redux/web3/web3Slice";

const providerOptions = {
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        //host: "https://localhost:8545", // optional
        //chainId: 1337, // optional
        //networkId: 1337 // optional
      },
      config: {
        buildEnv: "production" // optional
      }
    }
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc:"https://polygon-mumbai.infura.io/v3/3c072dd341bb4e45858038e146195ae1"
      //infuraId: "INFURA_ID" // required
    }
  }
};

async function setProvider (provider) {
  await dispatch(updateProvider(provider));
}


export const useWeb3ModalLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.web3.isLoggedIn);
  const provider = useSelector((state: RootState) => state.web3.provider);

  const [triggerLogin, setTriggerLogin] = useState<boolean>(false);

  const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  //cacheProvider: true, // optional
  //providerOptions // required
  providerOptions, // required
  theme: "dark"
});

  const handleLogin = () => {
    isLoggedIn ? logOut() : setTriggerLogin(true);
  };

  const logOut = () => {
    if(provider?.provider?.isTorus){
      if(provider?.provider){
        console.log(provider)
        provider.cleanUp();
      }
    }
    dispatch(reset({}))
  }


  //Login with web3Modal
  useEffect(() => {
    if (triggerLogin) {
      const web3ModalLogin = async () => {

        //const provider = await web3Modal.connect().then((account) => {
        await web3Modal.connect().then((provider) => {
          console.log("Provider:");
          console.log(provider);

          setTimeout(() => {

          dispatch(updateAccount(provider.selectedAddress))
          dispatch(updateProvider(provider))

          }, 2000);

          //console.log(account.selectedAddress)
          //dispatch(updateProvider(provider));
          //dispatch(updateAccount(provider.selectedAddress))
          //dispatch(updateAccount(provider.selectedAddress))
          //console.log(web3Modal.providerController.injectedProvider);
        });
      };

      web3ModalLogin();
    }
  }, [triggerLogin]);

  return [isLoggedIn, handleLogin];
};
