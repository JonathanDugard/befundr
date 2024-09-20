import { program } from "../config";
import { createProject, createUser, createUserWalletWithSol } from "../utils";
import { projectData1 } from "./project_dataset";
import { userData1 } from "../user/user_dataset";

describe('createProject', () => {
    it("should successfully create a project", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const projectPdaKey = await createProject(projectData1, 0, userPdaKey, userWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        expect(projectPda.name).toEqual(projectData1.name);
        expect(projectPda.description).toEqual(projectData1.description);
        expect(projectPda.imageUrl).toEqual(projectData1.imageUrl);
        expect(projectPda.owner).toEqual(userWallet.publicKey);
        expect(projectPda.user).toEqual(userPdaKey);
        expect(projectPda.endTime.toNumber()).toEqual(projectData1.endTime.toNumber() / 1000);
        expect(projectPda.goalAmount.toNumber()).toEqual(projectData1.goalAmount.toNumber());
        expect(projectPda.safetyDeposit.toNumber()).toEqual(projectData1.safetyDeposit.toNumber());
    });
});