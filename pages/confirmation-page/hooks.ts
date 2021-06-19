import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import getEnvVars from '../../environment';

const { host, chainId, networkName, debug, spcAbi, spcAddress  } = getEnvVars();

import {
  updateProvider,
  updateAccount,
  reset,
} from "../../redux/web3/web3Slice";
import { ethers } from "ethers";

export const useDepositAndCommit = async () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.web3.isLoggedIn);
  const provider = useSelector((state: RootState) => state.web3.provider);

  const spc = new ethers.Contract(spcAbi, spcAddress, provider);

  console.log("Sending commitment transaction")
};
