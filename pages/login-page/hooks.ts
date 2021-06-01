import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import Torus from "@toruslabs/torus-embed";
import getEnvVars from '../../environment';

const { host, chainId, networkName, debug } = getEnvVars();

import {
  updateProvider,
  updateAccount,
  reset,
} from "../../redux/web3/web3Slice";

export const useTorusLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.web3.isLoggedIn);
  const [triggerLogin, setTriggerLogin] = useState<boolean>(false);

  const torus = new Torus({
    buttonPosition: "bottom-left",
  });

  const handleLogin = () => {
    isLoggedIn ? dispatch(reset()) : setTriggerLogin(true);
  };

  //Login in Torus
  useEffect(() => {
    if (triggerLogin) {
      const torusLogin = async () => {
        await torus.init({
          buildEnv: "production",
          enableLogging: debug,
          network: {
            host: host,
            chainId: chainId,
            networkName: networkName,
          },
          showTorusButton: true,
        });

        await torus.login().then((account) => {
          console.log(account[0]);
          dispatch(updateAccount(account));
          dispatch(updateProvider(torus));
        });
      };

      torusLogin();
    }
  }, [triggerLogin]);

  return [isLoggedIn, handleLogin];
};
