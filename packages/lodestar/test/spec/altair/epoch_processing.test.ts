import {allForks, altair} from "@chainsafe/lodestar-beacon-state-transition";
import {phase0} from "@chainsafe/lodestar-beacon-state-transition";
import {ForkName} from "@chainsafe/lodestar-params";
import {EpochProcessFn, epochProcessing} from "../allForks/epochProcessing";

/* eslint-disable @typescript-eslint/naming-convention */

epochProcessing(ForkName.altair, {
  effective_balance_updates: allForks.processEffectiveBalanceUpdates,
  eth1_data_reset: allForks.processEth1DataReset,
  historical_roots_update: allForks.processHistoricalRootsUpdate,
  inactivity_updates: altair.processInactivityUpdates as EpochProcessFn,
  justification_and_finalization: allForks.processJustificationAndFinalization,
  participation_flag_updates: altair.processParticipationFlagUpdates as EpochProcessFn,
  participation_record_updates: (phase0.processParticipationRecordUpdates as unknown) as EpochProcessFn,
  randao_mixes_reset: allForks.processRandaoMixesReset,
  registry_updates: allForks.processRegistryUpdates,
  rewards_and_penalties: altair.processRewardsAndPenalties as EpochProcessFn,
  slashings: altair.processSlashings as EpochProcessFn,
  slashings_reset: allForks.processSlashingsReset,
  sync_committee_updates: altair.processSyncCommitteeUpdates as EpochProcessFn,
});
