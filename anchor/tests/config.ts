import * as anchor from '@coral-xyz/anchor';
import { Befundr } from '../src';

anchor.setProvider(anchor.AnchorProvider.env());

const systemProgram = anchor.web3.SystemProgram;
const program = anchor.workspace.Befundr as anchor.Program<Befundr>;

export {
    systemProgram,
    program,
    anchor
}