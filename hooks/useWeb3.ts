import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import useContracts from "./useContracts";
import { useAppDispatch } from "../redux/store";
import { updateContracts } from "../redux/web3/web3Slice";
import { Contract, Signer } from "ethers";

const useWeb3 = () => {
    const dispatch = useAppDispatch();

    const account: string = useSelector((state: RootState) => state.web3?.account);
    const provider = useSelector((state: RootState) => state.web3.provider);
    const web3LoggedIn: boolean = useSelector((state: RootState) => state.web3.isLoggedIn);
    const { dai, singlePlayerCommit } = useContracts();
    
    //Connect contract with signer from provider
    useEffect(() => {
        const _signer: Signer = provider.getSigner();
        const _dai: Contract = dai.connect(_signer);
        const _singlePlayerCommit: Contract = singlePlayerCommit.connect(_signer);
        dispatch(updateContracts({dai: _dai, singlePlayerCommit: _singlePlayerCommit}))
    }, [provider])

    return { account, provider, web3LoggedIn}
}

export default useWeb3;