import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Torus from "@toruslabs/torus-embed";

import { updateProvider, updateAccount, reset } from "../../redux/web3/web3Slice";

export const useTorusLogin = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.web3.isLoggedIn);
  const [triggerLogin, setTriggerLogin] = useState(false);

  const torus = new Torus({
    buttonPosition: "bottom-left",
  });

  const handleLogin = () => {
    isLoggedIn ? dispatch(reset()) : setTriggerLogin(true) ;
  };

  //Login in Torus
  useEffect(() => {
      if(triggerLogin){
        const torusLogin = async () => {
            await torus.init({
              buildEnv: "production",
              enableLogging: true,
              network: {
                host: "mumbai",
                chainId: 80001,
                networkName: "Mumbai Test Network",
              },
              showTorusButton: true,
            });
      
            await torus.login().then((account) => {
              dispatch(updateAccount(account));
              dispatch(updateProvider(torus));
            });
          };
      
          torusLogin();
      }
    
  }, [triggerLogin]);

  return [isLoggedIn, handleLogin];
};
