import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Torus from "@toruslabs/torus-embed";
import getEnvVars from '../../environment';
import Web3 from "web3";
import Web3Modal from "web3modal";

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
        buildEnv: "development" // optional
      }
    }
  }
};

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

export const useWeb3ModalLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.web3.isLoggedIn);
  const provider = useSelector((state: RootState) => state.web3.provider);

  const [triggerLogin, setTriggerLogin] = useState<boolean>(false);

  const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  //cacheProvider: true, // optional
  providerOptions // required
});

  const handleLogin = () => {
    isLoggedIn ? logOut() : setTriggerLogin(true);
  };

  const logOut = () => {
    if(provider?.provider?.isTorus){
      console.log(provider)
      provider.cleanUp();
    }
    dispatch(reset({}))
  }


  //Login with web3Modal
  useEffect(() => {
    if (triggerLogin) {
      const web3ModalLogin = async () => {

        const provider = await web3Modal.connect().then((account) => {
          //wait(7000);
          console.log("account:")
          console.log(account.selectedAddress)
          dispatch(updateAccount(account.selectedAddress));
          console.log(web3Modal)
          console.log(web3Modal.providerController.injectedProvider)
          dispatch(updateProvider(web3Modal));
        });
      };

      web3ModalLogin();
    }
  }, [triggerLogin]);

  return [isLoggedIn, handleLogin];
};
