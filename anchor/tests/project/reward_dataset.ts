import { convertAmountToDecimals } from "../token/token_config";
import { Reward } from "./reward_type";

export const reward1: Reward = {
    name: 'reward1',
    description: 'reward1',
    price: convertAmountToDecimals(1),
    maxSupply: 25,
    currentSupply: 0
};

export const reward2: Reward = {
    name: 'reward2',
    description: 'reward2',
    price: convertAmountToDecimals(200),
    maxSupply: 10,
    currentSupply: 0
};

export const reward3: Reward = {
    name: 'reward3',
    description: 'reward3',
    price: convertAmountToDecimals(400),
    maxSupply: 1,
    currentSupply: 0
};