import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { Contract } from "ethers";

const useContracts = () => {
  const contracts = useSelector((state: RootState) => state.web3.contracts);

  const dai: Contract = contracts.dai;
  const singlePlayerCommit: Contract = contracts.singlePlayerCommit;

  return { dai, singlePlayerCommit}

}

export default useContracts;