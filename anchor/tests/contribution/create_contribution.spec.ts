import { program } from "../config";
import { createContribution, createProject, createUser, createUserWalletWithSol } from "../utils";
import { ONE_DAY_MILLISECONDS, projectData1 } from "../project/project_dataset";
import { userData1, userData2} from "../user/user_dataset";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ContributionStatus } from "./contribution_status";

describe('createContribution', () => {
    it("should successfully create a contribution", async () => {
        const creatorWallet = await createUserWalletWithSol();
        const creatorUserPdaKey = await createUser(userData1, creatorWallet);
        const projectPdaKey = await createProject(projectData1, 0, creatorUserPdaKey, creatorWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData2, userWallet);

        const projectContributionCounter = projectPda.contributionCounter;

        const contributionAmount = 1 * LAMPORTS_PER_SOL;
        const contributionPdaKey = await createContribution(
            projectPdaKey, 
            userPdaKey, 
            userWallet, 
            projectContributionCounter, 
            contributionAmount, 
            0
        );

        const contributionPda = await program.account.contribution.fetch(contributionPdaKey);

        expect(contributionPda.initialOwner).toEqual(userPdaKey);
        expect(contributionPda.currentOwner).toEqual(userPdaKey);
        expect(contributionPda.project).toEqual(projectPdaKey);
        expect(contributionPda.amount.toNumber()).toEqual(contributionAmount);
        expect(contributionPda.rewardId.toNumber()).toEqual(0);
        expect(contributionPda.creationTimestamp.toNumber()).toBeGreaterThan(0);
        expect(contributionPda.isClaimed).toBeNull();
        //expect(contributionPda.status).toEqual(ContributionStatus.Active);

    });
});