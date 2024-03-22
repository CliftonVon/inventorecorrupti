import fs from "node:fs";
import path from "node:path";
import {VOTING_KEYSTORE_FILE} from "../validatorDir/paths";

/**
 * Find files recursively in `dirPath` whose filename matches a custom function
 * @param dirPath
 * Return `true` for a given filepath to be included
 * @param filenameMatcher
 */
export function recursivelyFind(dirPath: string, filenameMatcher: (filename: string) => boolean): string[] {
  let filepaths: string[] = [];
  for (const filename of fs.readdirSync(dirPath)) {
    const filepath = path.join(dirPath, filename);
    if (fs.statSync(filepath).isDirectory()) {
      filepaths = filepaths.concat(recursivelyFind(filepath, filenameMatcher));
    } else if (filenameMatcher(filename)) {
      filepaths.push(filepath);
    }
  }
  return filepaths;
}

/**
 * Find voting keystores recursively in `dirPath`
 */
export function recursivelyFindVotingKeystores(dirPath: string): string[] {
  return recursivelyFind(dirPath, isVotingKeystore);
}

/**
 * Returns `true` if we should consider the `filename` to represent a voting keystore.
 */
export function isVotingKeystore(filename: string): boolean {
  // All formats end with `.json`.
  return (
    filename.endsWith(".json") &&
    // Keystores generated by clients
    (filename === VOTING_KEYSTORE_FILE ||
      // The format exported by the `eth2.0-deposit-cli` library.
      //
      // Reference to function that generates keystores:
      // eslint-disable-next-line max-len
      // https://github.com/ethereum/eth2.0-deposit-cli/blob/7cebff15eac299b3b1b090c896dd3410c8463450/eth2deposit/credentials.py#L58-L62
      //
      // Since we include the key derivation path of `m/12381/3600/x/0/0` this should only ever match
      // with a voting keystore and never a withdrawal keystore.
      //
      // Key derivation path reference:
      //
      // https://eips.ethereum.org/EIPS/eip-2334
      /keystore[\w-]*.json/.test(filename))
  );
}

/**
 * Returns true if filename is a BLS Keystore passphrase file
 */
export function isPassphraseFile(filename: string): boolean {
  return /[0-9A-Fa-f]{96}/.test(filename);
}
