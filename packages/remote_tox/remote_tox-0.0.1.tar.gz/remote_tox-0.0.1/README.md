RemoteTox
=========

Remote testing of python environments (that use `tox`).

What this does
--------------

1. Acquires a lock to ensure simultaneous repositories are not being tested.
2. Connects to (randomly selected if multiple are given) remote machine (ssh
   keys need to be setup to allow this to happen in a non-intrusive way).
3. Archives the current working directory into a tarball.
4. Sends this tarball to the remote machine (after removing any
   old or previous tarballs, test environments...).
5. Runs `tox` on the remote machine, proxying the stderr/stdout to the
   local stderr/stdout (making it look like the output of that remote
   program is actually local).
6. Returns the remote `tox` programs exit code as the local programs exit
   code (making it look like the remote programs exit code was the local
   programs exit code).
