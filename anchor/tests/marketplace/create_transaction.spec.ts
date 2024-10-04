import { program } from "../config";
import { createContribution, createProject, createTransaction, createUser, createUserWalletWithSol } from "../utils";
import { userData1, userData2 } from "../user/user_dataset";
import { projectData1 } from "../project/project_dataset";
import { convertAmountToDecimals } from "../token/token_config";

describe('create_transaction', () => {
    it.skip("should successfully create a sell transaction", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const { projectPdaKey } = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        const sellerWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, sellerWallet);

        const projectContributionCounter = projectPda.contributionCounter;

        const contributionAmount = convertAmountToDecimals(100);
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            sellerWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );

        const sellingPrice = convertAmountToDecimals(20);

        const saleTransactionPdaKey = await createTransaction(contributionPdaKey, userPdaKey, sellerWallet, sellingPrice);

        const saleTransactionPda = await program.account.saleTransaction.fetch(saleTransactionPdaKey);

        expect(saleTransactionPda.contribution.toString()).toEqual(contributionPdaKey.toString());
        expect(saleTransactionPda.contributionAmount.toString()).toEqual(contributionAmount.toString());
        expect(saleTransactionPda.seller.toString()).toEqual(userPdaKey.toString());
        expect(saleTransactionPda.sellingPrice.toString()).toEqual(sellingPrice.toString());
    });

    it.skip("should throw an error if the contribution is already for sale", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const { projectPdaKey } = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet);
        const projectPda = await program.account.project.fetch(projectPdaKey);
        const sellerWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, sellerWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = convertAmountToDecimals(100);
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            sellerWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );
        const sellingPrice = convertAmountToDecimals(200);
        const secondSellingPrice = convertAmountToDecimals(40);

        const saleTransactionPdaKey = await createTransaction(contributionPdaKey, userPdaKey, sellerWallet, sellingPrice);

        const errorRegex = new RegExp(`Allocate: account Address { address: (?<address>${saleTransactionPdaKey.toString()}), base: None } already in use`);

        await expect(createTransaction(contributionPdaKey, userPdaKey, sellerWallet, secondSellingPrice)).rejects.toThrow(errorRegex);

        const saleTransactionPda = await program.account.saleTransaction.fetch(saleTransactionPdaKey);
        expect(saleTransactionPda.sellingPrice.toString()).toEqual(sellingPrice.toString());
    });

    it.skip("should throw an error if the contribution has no associated reward", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const { projectPdaKey } = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet);
        const projectPda = await program.account.project.fetch(projectPdaKey);
        const sellerWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, sellerWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = convertAmountToDecimals(100);;
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            sellerWallet,
            projectContributionCounter,
            contributionAmount,
            null
        );
        const sellingPrice = convertAmountToDecimals(200);;
        const expectedError = /Error Code: NoReward\. Error Number: .*\. Error Message: No reward associated to this contribution.*/;

        await expect(createTransaction(contributionPdaKey, userPdaKey, sellerWallet, sellingPrice)).rejects.toThrow(expectedError);
    });

    it.skip("should throw an error if the selling price is 0", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const { projectPdaKey } = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet);
        const projectPda = await program.account.project.fetch(projectPdaKey);
        const sellerWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, sellerWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = convertAmountToDecimals(100);
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            sellerWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );
        const sellingPrice = 0;
        const expectedError = /Error Code: IncorrectSellingPrice\. Error Number: .*\. Error Message: Incorrect selling price.*/;

        await expect(createTransaction(contributionPdaKey, userPdaKey, sellerWallet, sellingPrice)).rejects.toThrow(expectedError);
    });

    it("should throw an error if the contribution reward has already been claimed", async () => {
    });

    it("should throw an error if the contribution has been cancelled", async () => {
    });
});