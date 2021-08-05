import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { Contract } from 'ethers';
import { useEffect } from "react";
import useWeb3 from "./useWeb3";

const useContracts = ()=> {
  const { dai, singlePlayerCommit } = useSelector((state: RootState) => state.web3.contracts);

  return { dai, singlePlayerCommit}

}

export default useContracts;