import { userData1, userData2, userData3 } from './user_dataset';
import { createUser, createUserWalletWithSol } from '../utils';
import { program } from '../config';

describe('createUser', () => {

  it("Creates 3 users with predefined data", async () => {
    const userDataList = [userData1, userData2, userData3]
    for (let i = 0; i < 3; i++) {
      const userWallet = await createUserWalletWithSol();
      const userData = userDataList[i];

      const userPda = await createUser(userData, userWallet);

      // Fetch the created user profile
      const user = await program.account.user.fetch(userPda);

      // Assert that the user profile was created correctly
      expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
      expect(user.name).toEqual(userData.name ?? null);
      expect(user.avatarUrl).toEqual(userData.avatar_url ?? null);
      expect(user.bio).toEqual(userData.bio ?? null);
      expect(user.createdProjectCounter).toEqual(0);
    }
  });

  it("Creates 2 users with empty data", async () => {
    for (let i = 0; i < 2; i++) {
      const userWallet = await createUserWalletWithSol();

      const userPda = await createUser({}, userWallet);

      // Fetch the created user profile
      const user = await program.account.user.fetch(userPda);

      // Assert that the user profile was created correctly
      expect(user.owner.toString()).toEqual(userWallet.publicKey.toString());
      expect(user.name).toBeNull();
      expect(user.avatarUrl).toBeNull();
      expect(user.bio).toBeNull();
      expect(user.createdProjectCounter).toEqual(0);
    }
  });

});
