import { anchor, program } from "../config";
import { createContribution, createProject, createUnlockRequest, createUser, createUserWalletWithSol } from "../utils";
import { projectData2 } from "../project/project_dataset";
import { userData1, userData2 } from "../user/user_dataset";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { UnlockStatus } from "./unlock_status";

describe('createUnlockRequest', () => {
    it.skip("should successfully create an unlock request", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData2, 0, creatorUserPdaKey, creatorWallet)
        const projectPda = await program.account.project.fetch(projectPdaKey);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = 100 * LAMPORTS_PER_SOL;
        const expectedUnlockAmount = 10 * LAMPORTS_PER_SOL;
        const expectedCounterBefore = 0;
        const expectedCounterAfter = 1;

        await createContribution(
            projectPdaKey,
            userPdaKey,
            userWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );

        const [unlockRequestsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("project_unlock_requests"),
                projectPdaKey.toBuffer(),
            ],
            program.programId
        );

        const unlockRequests = await program.account.unlockRequests.fetch(unlockRequestsPubkey);
        expect(unlockRequests.requestCounter).toEqual(expectedCounterBefore);

        const unlockRequestPdaKey = await createUnlockRequest(projectPdaKey, creatorUserPdaKey, creatorWallet, unlockRequests.requestCounter, expectedUnlockAmount);

        const unlockRequest = await program.account.unlockRequest.fetch(unlockRequestPdaKey);

        expect(unlockRequest.project).toEqual(projectPdaKey);
        expect(unlockRequest.amountRequested.toNumber()).toEqual(expectedUnlockAmount);
        expect(unlockRequest.votesAgainst.toNumber()).toEqual(0);
        //expect(unlockRequest.createdTime.toNumber()).toEqual(expectedUnlockAmount);
        //expect(unlockRequest.endTime.toNumber()).toEqual(expectedUnlockAmount);
        //expect(unlockRequest.unlockTime.toNumber()).toEqual(expectedUnlockAmount);
        expect(new UnlockStatus(unlockRequest.status).enum).toEqual(UnlockStatus.Approved.enum);

        const unlockRequestsAfter = await program.account.unlockRequests.fetch(unlockRequestsPubkey);
        expect(unlockRequestsAfter.requestCounter).toEqual(expectedCounterAfter);

    });

    it.skip("should reject as there is already one active", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData2, 0, creatorUserPdaKey, creatorWallet)
        const projectPda = await program.account.project.fetch(projectPdaKey);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = 100 * LAMPORTS_PER_SOL;
        const expectedUnlockAmount = 10 * LAMPORTS_PER_SOL;
        const expectedError = /Error Code: UnlockVoteAlreadyOngoing\. Error Number: .*\. Error Message: There is already a vote ongoing.*/;

        await createContribution(
            projectPdaKey,
            userPdaKey,
            userWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );

        const [unlockRequestsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("project_unlock_requests"),
                projectPdaKey.toBuffer(),
            ],
            program.programId
        );

        const unlockRequests = await program.account.unlockRequests.fetch(unlockRequestsPubkey);

        await createUnlockRequest(projectPdaKey, creatorUserPdaKey, creatorWallet, unlockRequests.requestCounter, expectedUnlockAmount);

        const freshUnlockRequests = await program.account.unlockRequests.fetch(unlockRequestsPubkey);
        await expect(createUnlockRequest(projectPdaKey, creatorUserPdaKey, creatorWallet, freshUnlockRequests.requestCounter, expectedUnlockAmount)).rejects.toThrow(expectedError);
    });

    it("should reject as the project status is not Realising", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData2, 0, creatorUserPdaKey, creatorWallet)
        const projectPda = await program.account.project.fetch(projectPdaKey);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);
        const projectContributionCounter = projectPda.contributionCounter;
        const contributionAmount = 100 * LAMPORTS_PER_SOL;
        const expectedUnlockAmount = 10 * LAMPORTS_PER_SOL;
        const expectedError = /Error Code: WrongProjectStatus\. Error Number: .*\. Error Message: The project is not in realization.*/;

        await createContribution(
            projectPdaKey,
            userPdaKey,
            userWallet,
            projectContributionCounter,
            contributionAmount,
            0
        );

        const [unlockRequestsPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("project_unlock_requests"),
                projectPdaKey.toBuffer(),
            ],
            program.programId
        );

        const unlockRequests = await program.account.unlockRequests.fetch(unlockRequestsPubkey);

        await expect(createUnlockRequest(projectPdaKey, creatorUserPdaKey, creatorWallet, unlockRequests.requestCounter, expectedUnlockAmount)).rejects.toThrow(expectedError);
    });
});