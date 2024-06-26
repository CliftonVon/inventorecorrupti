type Lockfile = {
  lockSync(path: string): void;
  unlockSync(path: string): void;
};

let lockFile: Lockfile | null = null;

function getLockFilepath(filepath: string): string {
  return `${filepath}.lock`;
}

/**
 * When lockfile it's required it registers listeners to process
 * Since it's only used by the validator client, require lazily to not pollute
 * beacon_node client context
 */
function getLockFile(): Lockfile {
  if (!lockFile) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    lockFile = require("lockfile") as Lockfile;
  }
  return lockFile;
}

/**
 * Creates a .lock file for `filepath`, argument passed must not be the lock path
 * @param filepath File to lock, i.e. `keystore_0001.json`
 */
export function lockFilepath(filepath: string): void {
  getLockFile().lockSync(getLockFilepath(filepath));
}

/**
 * Deletes a .lock file for `filepath`, argument passed must not be the lock path
 * @param filepath File to unlock, i.e. `keystore_0001.json`
 */
export function unlockFilepath(filepath: string): void {
  // Does not throw if the lock file is already deleted
  // https://github.com/npm/lockfile/blob/6590779867ee9bdc5dbebddc962640759892bb91/lockfile.js#L68
  getLockFile().unlockSync(getLockFilepath(filepath));
}
