# ghost-tag
A Python script to list, update, and delete your Ghost blog's tags.

# Install

```
$ pip install ghosttag
```

# Usage

Warning: Make a backup of your database first! You can do it like so:

```
$ cp ghost-dev.db ghost-dev.db.bak
```
```
list [--db-path=<path>]
```

Lists all the ghost tags in your database

```
update [--db-path=<path>] [--id=<tag-id>] [--name=<tag-name>] [--slug=<slug-name>]
```


Update the name or slug of a tag. Id is mandatory (you can find it by using the list command). You can define the name, slug, or both.

```
delete  [--db-path=<path>] [--id=<tag-id>]
```
Deletes the specific tag.


# Requirements

* docopt: Creates beautiful command line interfaces easily.
* tabulate: Pretty-print tabular data

# Contributing

Feel free to make your own PR


