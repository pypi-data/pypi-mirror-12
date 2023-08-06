# UNDER CONSTRUCTION!

# aptly_api_cli

### Why do we need another aptly cli interface?
- Because aptly-api-cli has a lot of more features build in.
- aptly-api-cli is made accessible to the python community


# Description
This python command line interface, executes calls to the Aptly server remotely, without blocking the Aptly database.
All functionality from here http://www.aptly.info/doc/api/ is extended by even more useful features, like clean out last N
snapshots or packages, etc. pp

You can make either use of the aptly_api_request.py as a starting point for your own application or just use the cli (aptly_api_cli.py)
bundled with this repository to execute your requests via command line.

# Installation

# Get started

# Command Line Options

## Help
Show this help message and exit
```
-h, --help
```
## Local Repos API
Local repositories management via REST API.

#### List 
List all local repos
```
python aptly_api_cli.py --repo_list
```

#### Create
Create empty local repository with specified parameters. REPO_NAME is the name of the repository to create. COMMENT,  DISTRIBUTION (e.g.: precise) and COMPONENT (e.g.: main) are optional.

```
python aptly_api_cli.py --repo_create=REPO_NAME [COMMENT] [DISTRIBUTION] [COMPONENT]
```

#### Show
Show basic information about a local repository. REPO_NAME is the name of the repository.

```
python aptly_api_cli.py --repo_show=REPO_NAME
```

#### Show Package
Show all packages of a local repository. REPO_NAME is the name of the repository. PACKAGE_TO_SEARCH (Name of the Package to search for), WITH_DEPS (e.g.: 0 or 1), FORMAT (e.g.: compact or detail) are optional. Please see http://www.aptly.info/doc/api/ for more details.

```
python aptly_api_cli.py --repo_show_packages=REPO_NAME [PACKAGE_TO_SEARCH] [WITH_DEPS] [FORMAT]
```

#### Edit
Edit information of a local repository.  

```
python aptly_api_cli.py --repo_edit=REPO_NAME COMMENT DISTRIBUTION COMPONENT
```

#### Delete
Delete repository.

```
python aptly_api_cli.py --repo_delete=REPO_NAME
```

#### Add Packages
Add packages to local repo by key
```
python aptly_api_cli.py --repo_add_packages_by_key=REPO_NAME PACKAGE_REFS
```

#### Delete Packages
Delete packages from repository by key
```
python aptly_api_cli.py --repo_delete_packages_by_key=REPO_NAME PACKAGE_REFS
```

## File Upload API
Upload package files temporarily to aptly service. These files could be added to local repositories using local repositories API.

All uploaded files are stored under <rootDir>/upload directory (see configuration). This directory would be created automatically if it doesn’t exist.

Uploaded files are grouped by directories to support concurrent uploads from multiple package sources. Local repos add API can operate on directory (adding all files from directory) or on individual package files. By default, all successfully added package files would be removed.

#### List Directories
Lists all upload-directories.
```
python aptly_api_cli.py --file_list_dirs
```

#### Upload files
Upload file to local upload-directory 
```
python aptly_api_cli.py --file_upload=UPLOAD_DIR FILE
```

#### Add Package 
Add package from upload folder to local repo
```
python aptly_api_cli.py --repo_add_package_from_upload=REPO_NAME UPLOAD_DIR PACKAGE_NAME
```

#### List files
List uploaded files
```
python aptly_api_cli.py --file_list
```

#### Delete directory
Delete upload directory
```
python aptly_api_cli.py --file_delete_dir=UPLOAD_DIR
```

#### Delete file
Delete a file in upload directory
```
python aptly_api_cli.py --file_delete=UPLOAD_DIR FILE
```

## Snapshot API
Snapshot management APIs.

Snapshot is a immutable package reference list taken from local repository, mirror or result of other snapshot processing.


#### Create snapshot from local repo
Create snapshot from local repo by giving the snapshot and repo name as parameter. A description is optional.
```
python aptly_api_cli.py --snapshot_create_from_local_repo=SNAPSHOT_NAME REPO_NAME [DESCRIPTION]
```

#### Create snapshot by package references
Create snapshot by package references. The snapshot name, a comma separated list of snapshots and package references should be given as parameter. A description is optional.
```
python aptly_api_cli.py --snapshot_create_by_pack_refs=SNAPSHOT_NAME SOURCE_SNAPSHOTS PACKAGE_REF_LIST [DESCRIPTION]
```

#### Snapshot show
Show basic information about snapshot
```
python aptly_api_cli.py --snapshot_show=SNAPSHOT_NAME
```

#### Snapshot show packages 
Show all packages the snapshot is containing or optionally search for one.
```
python aptly_api_cli.py --snapshot_show_packages=SNAPSHOT_NAME [PACKAGE_TO_SEARCH] [WITH_DEPS] [FORMAT]
```

#### Update snapshot 
Rename snapshot and optionally change description
```
python aptly_api_cli.py --snapshot_update=OLD_SNAPSHOT_NAME NEW_SNAPSHOT_NAME [DESCRIPTION]
```

#### Snapshot list
Lists all available snapshots
```
python aptly_api_cli.py --snapshot_list
```

#### Snapshot diff
List differences of two snapshots
```
python aptly_api_cli.py --snapshot_diff=LEFT_SNAPSHOT_NAME RIGHT_SNAPSHOT_NAME
```
#### Snapshot delete
Delete snapshot by name. Optionally force deletion.
```
python aptly_api_cli.py --snapshot_delete=SNAPSHOT_NAME [FORCE_DELETION]
```

## Publish API
Manages published repositories.

#### Publish list
List all available repositories to publish to
```
python aptly_api_cli.py --publish_list
```

#### Publish 
Publish snapshot or repository to storage
```
python aptly_api_cli.py --publish=PREFIX SOURCES_KIND SOURCES_LIST DISTRIBUTION_LIST [COMPONENT] [LABEL] [ORIGIN] [FORCE_OVERWRITE] [ARCHITECTURES_LIST]
```

#### Publish drop
Drop published repo content
```
python aptly_api_cli.py --publish_drop=PREFIX DISTRIBUTION [FORCE_REMOVAL]
```


#### Publish switch
Switching snapshots to published repo with minimal server down time.

```
python aptly_api_cli.py --publish_switch=PREFIX SOURCES_LIST DISTRIBUTION [COMPONENT] [FORCE_OVERWRITE]
```

## Misc API

#### Returns aptly version
```
python aptly_api_cli.py --get_version
```

## Package API
APIs related to packages on their own.

#### Package show
Show packages by key
```
python aptly_api_cli.py --package_show_by_key=PACKAGE_KEY
```
