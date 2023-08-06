
Use Snap-CI env vars to determine which tests to run

- SNAP_WORKER_TOTAL indicates total number of nodes tests are running on
- SNAP_WORKER_INDEX indicates which node this is

Will run a subset of tests based on the node index.



