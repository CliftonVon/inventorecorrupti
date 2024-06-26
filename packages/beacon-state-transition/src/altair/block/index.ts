import {altair} from "@chainsafe/lodestar-types";

import {CachedBeaconStateAltair} from "../../types";
import {processBlockHeader, processEth1Data, processRandao} from "../../allForks/block";
import {processOperations} from "./processOperations";
import {processAttestations, RootCache} from "./processAttestation";
import {processAttesterSlashing} from "./processAttesterSlashing";
import {processDeposit} from "./processDeposit";
import {processProposerSlashing} from "./processProposerSlashing";
import {processVoluntaryExit} from "./processVoluntaryExit";
import {processSyncAggregate} from "./processSyncCommittee";

export {
  processOperations,
  processAttestations,
  RootCache,
  processAttesterSlashing,
  processDeposit,
  processProposerSlashing,
  processVoluntaryExit,
  processSyncAggregate,
};

export function processBlock(state: CachedBeaconStateAltair, block: altair.BeaconBlock, verifySignatures = true): void {
  processBlockHeader(state, block);
  processRandao(state, block, verifySignatures);
  processEth1Data(state, block.body.eth1Data);
  processOperations(state, block.body, verifySignatures);
  processSyncAggregate(state, block, verifySignatures);
}
