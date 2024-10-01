import { program } from "../config";
import { createContribution, createProject, createUser, createUserWalletWithSol } from "../utils";
import { ONE_DAY_MILLISECONDS, projectData1 } from "../project/project_dataset";
import { userData1, userData2} from "../user/user_dataset";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, Enum } from "@solana/web3.js";
import { ContributionStatus } from "./contribution_status";
import { 
    convertAmountToDecimals, 
} from "../token/token_config";

describe('createContribution', () => {
    it("should successfully create a contribution with reward", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);

        const projectContributionCounter = projectPda.contributionCounter;

        const mintAmount = 500;
        const contributionAmount = 100; // Read it as 100 USDC
        
        const contributionPdaKey = await createContribution(
            projectPdaKey, 
            userPdaKey, 
            userWallet, 
            projectContributionCounter, 
            contributionAmount, 
            0,
            mintAmount,
        );

        const contributionPda = await program.account.contribution.fetch(contributionPdaKey);

        expect(contributionPda.initialOwner).toEqual(userPdaKey);
        expect(contributionPda.currentOwner).toEqual(userPdaKey);
        expect(contributionPda.project).toEqual(projectPdaKey);
        expect(contributionPda.amount.toNumber()).toEqual(convertAmountToDecimals(contributionAmount));
        expect(contributionPda.rewardId.toNumber()).toEqual(0);
        expect(contributionPda.creationTimestamp.toNumber()).toBeGreaterThan(0);
        expect(contributionPda.isClaimed).toBeNull();
        expect(new Enum(contributionPda.status).enum).toBe(ContributionStatus.Active.enum);
    });

    it.skip("should fail if the project is not in fundraising state", async () => {
        // no project state updates instruction exist at this time
    });

    it.skip("should fail if the project is not in fundraising period", async () => {
        // unable to create a past project 
    });

    it("should fail if the signer is not the actual user PDA owner", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);

        const projectPda = await program.account.project.fetch(projectPdaKey);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = 1 * LAMPORTS_PER_SOL;

        // Create a different wallet to simulate the wrong signer
        const wrongWallet = await createUserWalletWithSol();

        const expectedErrorMessage = new RegExp("Signer must be the user.");

        await expect(
            createContribution(
                projectPdaKey,
                userPdaKey,
                wrongWallet, // Using the wrong wallet here
                projectContributionCounter,
                contributionAmount,
                0,
                null
            )
        ).rejects.toThrow(expectedErrorMessage);
    });

    it("should fail if the contribution amount is not positive and greater than 0", async () => {
        // empty
    });

    it("should fail if the reward does not exist in the project rewards list", async () => {
        // empty
    });

    it("should fail if the contribution amount is insufficient for the selected reward", async () => {
        // empty
    });

    it("should fail if the reward supply has reached its maximum limit", async () => {
        // empty
    });

    it("should update the reward supply if a valid reward is selected", async () => {
        // empty
    });

    it("should update the project's raised amount and contribution counter", async () => {
        // empty
    });

    it("should update the ProjectContributions list", async () => {
        // empty
    });

    it("should update the UserContributions list", async () => {
        // empty
    });

    it("should transfer the contribution amount in USDC to the project", async () => {
        // empty
    });

    it("should handle errors during the contribution transfer", async () => {
        // empty
    });
});