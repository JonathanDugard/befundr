import { program, PROGRAM_CONNECTION } from "../config";
import { createContribution, createProject, createUser, createUserWalletWithSol } from "../utils";
import { ONE_DAY_MILLISECONDS, projectData1 } from "../project/project_dataset";
import { userData1, userData2} from "../user/user_dataset";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, Enum } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token"
import { ContributionStatus } from "./contribution_status";
import { 
    InitMint,
    MINT_ADDRESS,
    MintAmountTo,
    convertAmountToDecimals, 
} from "../token/token_config";

describe('createContribution', () => {
    it("should successfully create a contribution with reward", async () => {

        // Create new mint account
        if (typeof MINT_ADDRESS === 'undefined') {
            await InitMint();
        }
        
        // Prepare Creator context
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);
        const projectContributionCounter = projectPda.contributionCounter;

        // Prepare contributor context
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);
        // Mint 1000 "USDC" tokens to user wallet ATA
        const mintAmount = convertAmountToDecimals(10);
        const userWalletAta = await getAssociatedTokenAddress(MINT_ADDRESS, userWallet.publicKey);
        await MintAmountTo(userWallet, userWalletAta, mintAmount);

        // Create a contribution
        const contributionAmount = convertAmountToDecimals(5);
        const contributionPdaKey = await createContribution(
            projectPdaKey,
            userPdaKey,
            userWallet,
            projectContributionCounter,
            contributionAmount,
            0,
        );

        const contributionPda = await program.account.contribution.fetch(contributionPdaKey);
        const projectPdaUpdated = await program.account.project.fetch(projectPdaKey);
        // get updated user wallet ata balance
        const userWalletAtaAccount = await getAccount(PROGRAM_CONNECTION, userWalletAta);
        // get update project ata balance
        const projectAtaAddress = await getAssociatedTokenAddress(MINT_ADDRESS, projectPdaKey, true);
        const projectAtaAccount = await getAccount(PROGRAM_CONNECTION, projectAtaAddress);

        expect(userWalletAtaAccount.amount).toEqual(mintAmount - contributionAmount);
        expect(projectAtaAccount.amount).toEqual(contributionAmount);

        expect(contributionPda.initialOwner).toEqual(userPdaKey);
        expect(contributionPda.currentOwner).toEqual(userPdaKey);
        expect(contributionPda.project).toEqual(projectPdaKey);
        expect(BigInt(contributionPda.amount)).toEqual(contributionAmount);
        expect(contributionPda.rewardId.toNumber()).toEqual(0);
        expect(contributionPda.creationTimestamp.toNumber()).toBeGreaterThan(0);
        expect(contributionPda.isClaimed).toBeFalsy();
        expect(new Enum(contributionPda.status).enum).toBe(ContributionStatus.Active.enum);

        expect(BigInt(projectPdaUpdated.raisedAmount)).toEqual(contributionAmount);
        expect(projectPdaUpdated.contributionCounter).toEqual(projectContributionCounter+1)
    },
    20000);

    it("should fail if the project is not in fundraising state", async () => {
        // no project state updates instruction exist at this time
    });

    it("should fail if the project is not in fundraising period", async () => {
        // unable to create a past project 
    });

    it.skip("should fail if the signer is not the actual user PDA owner", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);

        const projectPda = await program.account.project.fetch(projectPdaKey);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = convertAmountToDecimals(5);

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