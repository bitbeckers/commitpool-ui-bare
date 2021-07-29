import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/store";
import {
  setLoggedIn,
  updateAccount,
  updateChain,
  updateProvider,
  updateWeb3Modal,
  Web3State,
} from "../redux/web3/web3Slice";
import { ethers } from "ethers";
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
  const { account, provider, isLoggedIn } = web3;

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
    if (!providerOptions) {
      dispatch(updateProvider(null));
      dispatch(updateAccount(null));
      dispatch(updateChain(null));
      dispatch(updateWeb3Modal(defaultModal));
      window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      return;
    }

    const localWeb3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: true,
      theme: "dark",
    });

    const provider = await localWeb3Modal.connect();
    provider.selectedAddress = deriveSelectedAddress(provider);
    const chainId = deriveChainId(provider);

    const chain = {
      ...supportedChains[chainId],
      chainId,
    };
    console.log("connecting provider");
    const web3: any = new ethers.providers.Web3Provider(provider);
    console.log("web3: ", web3);

    if (provider?.selectedAddress) {
      dispatch(updateProvider(web3));
      dispatch(updateAccount(provider.selectedAddress));
      dispatch(updateChain(chain));
      dispatch(updateWeb3Modal(localWeb3Modal));
      dispatch(setLoggedIn(true));
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      connectProvider();
    }
  }, []);

  const requestWallet = async () => {
    connectProvider();
  };

  return { account, provider, requestWallet, isLoggedIn };
};

const useWeb3 = () => {
  const { account, provider, isLoggedIn, requestWallet } = Web3Instance();

  return { account, provider, isLoggedIn, requestWallet };
};

export default useWeb3;
