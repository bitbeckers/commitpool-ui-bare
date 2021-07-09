import { ethers } from "ethers";

const isAddress = (account: string): boolean => {
    try {
      ethers.utils.getAddress(account);
      return true;
    } catch (e) {
      return false;
    }
  };

export { isAddress}