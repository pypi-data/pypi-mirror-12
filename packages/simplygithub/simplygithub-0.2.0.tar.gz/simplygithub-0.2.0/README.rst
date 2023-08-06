Simply Github
=============

A simple tool for working with Github remotely. The basic interface is minimal.
With ``Simply Github``, you can:

    * Create and delete branches.
    * Add or remove files from a branch.
    * Merge branches.


Profiles
--------

Pretty much every ``Simply Github`` function needs a profile as its first
argument. A profile provides ``Simply Github`` with two pieces of information.
It tells ``Simply Github``:

    * The ``repo`` it should connect to.
    * The ``token`` it should connect with.

The ``repo`` is the name of a repo in the standard git form of
``:owner/:repo`` -- for instance, ``jtpaasch/simplygithub``.

The ``token`` is a valid personal access token, which you can create from
your Github account, under account settings. See
https://help.github.com/articles/creating-an-access-token-for-command-line-use

To generate a profile to use just during a coding session, import the
``simplygithub.authentication.profile`` package and use the
``ephemeral_profile()`` function. For example::

    from simplygithub.authentication import profile

    my_profile = profile.ephemeral_profile(repo="jtpaasch/simplygithub",
                                           token="a3ef21ac0f...")

You can then use ``my_profile`` for any of the ``Simply Github`` functions
that need a profile.

An ephemeral profile only lasts for the coding session though. It disappears
when the ``my_profile`` variable disappears. If you want to store a profile
in a config file, use the ``write_profile()`` function.

That function takes the aforementioned ``repo`` and ``token`` arguments, but
you also need to give the profile a name so you can retrieve it later.

This creates the same profile as above, but names it ``default``::

    from simplygithub.authentication import profile

    my_profile = profile.write_profile(name="default",
                                       repo="jtpaasch/simplygithub",
                                       token="a3ef21ac0f...")

That will save the profile in a file at ``~/.profile/simplygithub/github``.
(You can also create/modify this file yourself, by hand.)

You can load the profile anytime later with the ``read_profile()`` function::

    from simplygithub.authentication import profile

    my_profile = profile.read_profile("default")

Once you have a profile loaded into a variable (like ``my_profile``), you can
use it for any of the ``Simply Github`` functions that requires a profile as
their first argument.


Creating branches
-----------------

Use the ``simplygithub.branches`` package to work with branches::

    from simplygithub import branches

To see a list of all your branches (using ``my_profile`` from above)::

    branches.list_branches(my_profile)

To create a branch off of master::

    branches.create_branch(my_profile, "feature-branch", branch_off="master")

To merge a feature branch into master::

    branches.merge(my_profile, "feature-branch", merge_into="master")
    
To delete a branch::

    branches.delete_branch(my_profile, "feature-branch")


Adding and removing files from a branch
---------------------------------------

Use the ``simplygithub.files`` package to work with files::

    from simplygithub import files

To list all file objects in a branch (using ``my_profile`` from above)::

    files.list_files(my_profile, "feature-branch")

To get the (UTF-8 encoded) contents of a file on a branch::

    files.get_file(my_profile,
                   branch="feature-branch",
                   file_path="folder/path/foo.py")
    
To add a file to a branch::

    files.add_file(my_profile,
                   branch="feature-branch",
                   file_path="folder/path/foo.py",
                   file_contents="This is a silly file.")

That will add a file at ``folder/path/foo.py``, and give it the contents
``This is a silly file.``. It will commit that into the ``feature-branch``.

If the file is an executable, add ``is_executable=True`` as a parameter. If
you want to provide a commit message, you do that with the ``commit_message``
parameter::

    files.add_file(my_profile,
                   branch="feature-branch",
                   file_path="folder/path/foo.py",
                   file_contents="This is a silly file.",
                   is_executable=True,
                   commit_message="Added a silly file.")
  
To delete a file from a branch::

    files.remove_file(my_profile,
                      branch="feature-branch",
                      file_path="folder/path/foo.py")

That will remove the file from the branch and commit the change. You can add
an optional ``commit_message`` parameter if you like::

    files.remove_file(my_profile,
                      branch="feature-branch",
                      file_path="folder/path/foo.py",
                      commit_message="Removed a silly file.")
