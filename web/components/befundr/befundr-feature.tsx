'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useBefundrProgram } from './befundr-data-access';
import { BefundrCreate, BefundrProgram } from './befundr-ui';

export default function BefundrFeature() {
  const { publicKey } = useWallet();
  const { programId } = useBefundrProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="Befundr"
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <BefundrCreate />
      </AppHero>
      <BefundrProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
