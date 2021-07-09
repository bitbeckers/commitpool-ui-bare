import Constants from "expo-constants";
import daiAbi from "./resources/contracts/DaiToken.json";
import abi from "./resources/contracts/SinglePlayerCommit.json";

interface EnvironmentProps {
  spcAbi: any;
  daiAbi: any;
  spcAddress: string;
  daiAddress: string;
  linkAddress: string;
  rpcUrl: string;
  biconomyApiKey?: string;
  host: string;
  chainId: number;
  networkName: string;
  debug: boolean;
  nativeToken: string;
}

const ENV = {
  dev: {
    spcAbi: abi,
    daiAbi: daiAbi,
    spcAddress: "0x6B6FD55b224b25B2F56A10Ce670B097e66Fca136",
    daiAddress: "0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB",
    // daiAddress: "0x6A383cf1F8897585718DCA629a8f1471339abFe4",
    linkAddress: "0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB",
    rpcUrl:
      "https://polygon-mumbai.infura.io/v3/3c072dd341bb4e45858038e146195ae1",
    biconomyApiKey: "V7nbIe8Ue.94e3d8fd-2f0d-42cc-96aa-27d57dac9a7c",
    host: "mumbai",
    chainId: 80001,
    networkName: "Mumbai",
    debug: true,
    nativeToken: "MATIC",
  },
  prod: {
    spcAbi: abi,
    daiAbi: daiAbi,
    spcAddress: "0x91E17f2A995f7EB830057a2F83ADa3A50a37F20d",
    daiAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    linkAddress: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    rpcUrl:
      "https://polygon-mainnet.infura.io/v3/3c072dd341bb4e45858038e146195ae1",
    host: "matic",
    chainId: 137,
    networkName: "Matic Network",
    debug: false,
    nativeToken: "MATIC",
  },
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev as EnvironmentProps;
  } else {
    return ENV.prod as EnvironmentProps;
  }
};

export default getEnvVars;
