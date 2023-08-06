Maggit
======

Introduction
------------

Maggit is a implementation of git in Python.
Maggit doesn't use subproccess call to git or external C libraries.
There is no more dependancy than python standard library.

Maggit need Python 3.4 at least.

The actual version (0.1) is pretty rough:

- The low level allow read and write git objects but the high level API provide
  only reading.
- There is remote, no push/pull, no merge/rebase, no working tree.
- API is not perfect and expect it changes.
- Documentation is not complete.
- Patches are welcomes. (Here are the `issues tracker`_ and the `merge requests`_)

Example
-------

Here a simple example code equivalent to `git log -n 10` to see how to use maggit:

 .. code-block:: python

    import maggit
    # Create a repository
    repo = maggit.Repo()
    branches = repo.branches
    master = branches['master']
    commit = master.commit
    for i in range(10):
        print(commit.message)
        commit = commit.parents[0]

See the doc_ for full information and how to use it.

 .. _doc: https://maggit.readthedocs.org
 .. _`issues tracker`: https://gitlab.com/maggit/maggit/issues
 .. _`merge requests`: https://gitlab.com/maggit/maggit/merge_requests
