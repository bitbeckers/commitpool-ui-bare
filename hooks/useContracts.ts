import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { Contract } from 'ethers';
import { useEffect } from "react";
import useWeb3 from "./useWeb3";

const useContracts = ()=> {
  const { dai, singlePlayerCommit } = useSelector((state: RootState) => state.web3.contracts);
  const { provider } = useWeb3();

  useEffect(() => {
    if(provider?.signer){
      dai.connect(provider);
      singlePlayerCommit.connect(provider);
    }
  }, [provider])

  // const dai: Contract = contracts.dai;
  // const singlePlayerCommit: Contract = contracts.singlePlayerCommit;

  console.log("SPC: ", singlePlayerCommit)

  return { dai, singlePlayerCommit}

}

export default useContracts;