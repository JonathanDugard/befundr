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
        expect(projectPda.projectDescription).toEqual(projectData1.project_description);
        expect(projectPda.imageUrl).toEqual(projectData1.image_url);
        expect(projectPda.owner).toEqual(userWallet.publicKey);
        expect(projectPda.user).toEqual(userPdaKey);
        expect(projectPda.endTime.toNumber()).toEqual(projectData1.end_time / 1000);
        expect(projectPda.goalAmount.toNumber()).toEqual(projectData1.goal_amount.toNumber());
    });
});