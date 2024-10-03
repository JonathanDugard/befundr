import { program } from "../config";
import { createContribution, createProject, createTransaction, createUser, createUserWalletWithSol } from "../utils";
import { userData1, userData2 } from "../user/user_dataset";
import { projectData1 } from "../project/project_dataset";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

describe('complete_transaction', () => {
    it.skip("should successfully complete a buy transaction", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        const sellerWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, sellerWallet);

        const projectContributionCounter = projectPda.contributionCounter;

        const contributionAmount = 1 * LAMPORTS_PER_SOL;
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            sellerWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );

        const sellingPrice = 2 * LAMPORTS_PER_SOL;

        const saleTransactionPdaKey = await createTransaction(contributionPdaKey, userPdaKey, sellerWallet, sellingPrice);

        const saleTransactionPda = await program.account.saleTransaction.fetch(saleTransactionPdaKey);

        //TODO complete test
    });
});