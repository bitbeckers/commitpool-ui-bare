import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/store";
import {
  setLoggedIn,
  updateAccount,
  updateChain,
  updateContracts,
  updateProvider,
  updateWeb3Modal,
  Web3State,
} from "../redux/web3/web3Slice";
import { updateTransactions, TransactionState } from "../redux/transactions/transactionSlice";
import { Contract, ethers, Transaction } from "ethers";
import Web3Modal from "web3modal";
import { supportedChains } from "../utils/chain";
import {
  deriveChainId,
  deriveSelectedAddress,
  getProviderOptions,
} from "../utils/web3Modal";

const Web3Instance = () => {
  const dispatch = useAppDispatch();
  const web3: Web3State = useSelector((state: RootState) => state.web3);
  const transactions: TransactionState = useSelector((state: RootState) => state.transactions);
  const { account, provider, isLoggedIn } = web3;
  const { dai, singlePlayerCommit } = web3.contracts;

  const hasListeners: any = useRef(null);

  const connectProvider = async () => {
    const providerOptions = getProviderOptions();

    const defaultModal: Web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: "dark",
    });

    console.log("defaultModal: ", defaultModal);
    console.log("providerOption: ", providerOptions);

    //Provideroptions will be false when e.g. MetaMask is connected to an unsupported network
    if (!providerOptions) {
      dispatch(updateProvider(null));
      dispatch(updateAccount(null));
      dispatch(updateChain(null));
      dispatch(updateWeb3Modal(defaultModal));
      dispatch(setLoggedIn(false));
      window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      return;
    }

    if (!isLoggedIn) {
      const localWeb3Modal = new Web3Modal({
        providerOptions,
        cacheProvider: true,
        theme: "dark",
      });

      const provider = await localWeb3Modal.connect().then((provider) => {
        console.log("Provider after localWeb3Modal promise: ", provider);

        return provider;
      });
      provider.selectedAddress = await deriveSelectedAddress(provider);
      const chainId = await deriveChainId(provider);
      console.log("Provider: ", provider);
      console.log("ChainId: ", chainId);

      const chain = {
        ...supportedChains[chainId],
        chainId,
      };
      console.log("connecting provider");
      const web3: any = new ethers.providers.Web3Provider(provider);
      console.log("web3: ", web3);

      if (provider?.selectedAddress) {
        console.log("Dispatching updated Web3 config");
        const _dai: Contract = dai.connect(web3.getSigner());
        const _singlePlayerCommit: Contract = singlePlayerCommit.connect(
          web3.getSigner()
        );
        dispatch(updateProvider(provider));
        dispatch(updateAccount(provider.selectedAddress));
        dispatch(updateChain(chain));
        dispatch(updateWeb3Modal(localWeb3Modal));
        dispatch(
          updateContracts({
            dai: _dai,
            singlePlayerCommit: _singlePlayerCommit,
          })
        );
        dispatch(setLoggedIn(true));
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      connectProvider();
    }
  }, []);

  useEffect(() => {
    const handleChainChange = () => {
      console.log("CHAIN CHANGE");
      connectProvider();
    };
    const accountsChanged = () => {
      console.log("ACCOUNT CHANGE");
      connectProvider();
    };

    const unsub = () => {
      if (provider?.currentProvider) {
        provider.currentProvider.removeListener(
          "accountsChanged",
          handleChainChange
        );
        provider.currentProvider.removeListener(
          "chainChanged",
          accountsChanged
        );
      }
    };

    if (provider?.currentProvider && !hasListeners.current) {
      provider.currentProvider
        .on("accountsChanged", accountsChanged)
        .on("chainChanged", handleChainChange);
      hasListeners.current = true;
    }
    return () => unsub();
  }, [provider]);

  const requestWallet = async () => {
    connectProvider();
  };

  const storeTransactionToState = (txDetails: TransactionDetails) => {
    dispatch(updateTransactions(txDetails));
  };

  const getTransaction = (
    methodCall: TransactionTypes
  ): Transaction | undefined => {
    return transactions[methodCall]?.txReceipt || undefined;
  };

  return {
    account,
    provider,
    requestWallet,
    transactions,
    isLoggedIn,
    getTransaction,
    storeTransactionToState,
  };
};

const useWeb3 = () => {
  const {
    account,
    provider,
    isLoggedIn,
    transactions,
    requestWallet,
    getTransaction,
    storeTransactionToState,
  } = Web3Instance();

  return {
    account,
    provider,
    isLoggedIn,
    transactions,
    requestWallet,
    getTransaction,
    storeTransactionToState,
  };
};

export default useWeb3;
