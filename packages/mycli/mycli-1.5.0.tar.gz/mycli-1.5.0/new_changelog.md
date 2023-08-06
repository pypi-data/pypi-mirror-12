1.5.0:
======

Features:
---------

* Make a config option to enable `audit_log`. (Thanks: [Matheus Rosa]).
* Add support for reading .mylogin.cnf to get user credentials. (Thanks: [Thomas Roten]).
  This feature is only available when `pycrypto` package is installed.
* Register the special command `prompt` with the `\R` as alias. (Thanks: [Matheus Rosa]).
  Users can now change the mysql prompt at runtime using `prompt` command.
  eg: 
  ```
  mycli> prompt \u@\h>
  Changed prompt format to \u@\h>
  Time: 0.001s
  amjith@localhost>
  ```
* Perform completion refresh in a background thread. Now mycli can handle
  databases with thousands of tables without blocking.
* Add support for `system` command. (Thanks: [Matheus Rosa]).
  Users can now run a system command from within mycli as follows:
  ```
  amjith@localhost:(none)>system cat tmp.sql
  select 1;
  select * from django_migrations;
  ```
* Caught and hexed binary fields in MySQL. (Thanks: [Daniel West]).
  Geometric fields stored in a database will be displayed as hexed strings.
* Treat enter key as tab when the suggestion menu is open. (Thanks: [Matheus Rosa])
* Add "delete" and "truncate" as destructive commands. (Thanks: [Martijn Engler]).
* Change \dt syntax to add an optional table name. (Thanks: [shoma]).
  `\dt [tablename]` will describe the columns in a table.
* Add TRANSACTION related keywords.
* Treat DESC and EXPLAIN as DESCRIBE. (Thanks: [spacewander]).

Bug Fixes:
----------

* Fix the removal of whitespace from table output. (Thanks: [Amjith Ramanujam]).
* Add ability to make suggestions for compound join clauses. (Thanks: [Matheus Rosa]).
* Fix the incorrect reporting of command time.

Internal Changes:
-----------------
* Make pycrypto optional and only install it in \*nix systems. (Thanks: [Iryna Cherniavska]).
* Add badge for PyPI version to README. (Thanks: [Shoma Suzuki]).
* Updated release script with a --dry-run and --confirm-steps option. (Thanks: [Iryna Cherniavska]).
* Adds support for PyMySQL 0.6.2 and above. This is useful for debian package builders. (Thanks: [Thomas Roten]).
* Disable click warning.

[Daniel West]: http://github.com/danieljwest
[Iryna Cherniavska]: https://github.com/j-bennet
[Kacper Kwapisz]: https://github.com/KKKas
[Martijn Engler]: https://github.com/martijnengler
[Matheus Rosa]:  https://github.com/mdsrosa
[Shoma Suzuki]: https://github.com/shoma
[spacewander]: https://github.com/spacewander
[Thomas Roten]: https://github.com/tsroten
