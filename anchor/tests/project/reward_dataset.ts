import { convertAmountToDecimals } from "../token/token_config";
import { Reward } from "./reward_type";

export const reward1: Reward = {
    metadataUri: 'https://myURL.com/rewards/reward1',
    price: 100,
    maxSupply: 25,
    currentSupply: 0
};

export const reward2: Reward = {
    metadataUri: 'https://myURL.com/rewards/reward2',
    price: 200,
    maxSupply: 10,
    currentSupply: 0
};

export const reward3: Reward = {
    metadataUri: 'https://myURL.com/rewards/reward3',
    price: 400,
    maxSupply: 5,
    currentSupply: 0
};