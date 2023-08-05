..
  Licensed under the Apache License, Version 2.0 (the "License"); you may
  not use this file except in compliance with the License. You may obtain
  a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations
  under the License.

Profiles
========

A profile is an object instantiated from a "profile type" and it is used as
the specification for creating a physical object to be managed by Senlin. The
"physical" adjective here is used to differentiate such an object from its
counterpart, the "logical" object, which is referred to as a node in Senlin.

As the specification for physical object creation, a profile contains almost
every piece of information needed for the underlying driver to create an
object. After a physical object is created, its UUID will be assigned to the
``physical_id`` property of a node as reference. When a physical object is
deleted, the ``physical_id`` property will be set to ``None``.

Although not required, a profile may reference the node object's properties
when creating a physical object. For example, a profile may use the node's
``index`` property value for generating a name for the object; a profile may
customize an object's property based on the ``role`` property value of a node.
It is up to the profile type author and the specific use case how a profile is
making use of the properties of a node.


------------------
Profile Properties
------------------

A profile object has the following properties:

- ``id``: a global unique ID assigned to the object after creation;
- ``name``: a string representation of the profile name;
- ``type``: a string referencing the profile type used;
- ``context``: a map of key-value pairs that contains credentials and/or
  parameters for authentication with an identity service. When a profile is
  about to create an object, it will use data stored here to establish a
  connection to a service;
- ``spec``: a map of key-value pairs that contains the specification for
  object creation. The content of this property is dictated by the
  corresponding profile type.
- ``permission``: a string representing the access permissions assigned to
  different user and/or user groups. The supporting feature is still under
  design.
- ``metadata``: a map of key-value pairs associated with the profile;
- ``created_time``: the timestamp when the profile was created;
- ``updated_time``: the timestamp when the profile was last updated;
- ``deleted_time``: the timestamp when the profile was deleted.

The ``spec`` property is the most important property for a profile. It is
immutable, i.e. changing the ``spec`` property will result in a new profile
being created. By restricting changes to this property, Senlin can do a better
job in managing the object configurations.


------------------
Creating A Profile
------------------

When creating a profile using the ``profile_create`` API, a user must provide
the ``name`` and ``spec`` parameters. All other parameters are optional.

The provided ``spec`` map will be validated using the validation logic
provided by the corresponding profile type. If the validation succeeds, the
profile will be created and stored into the database. Senlin engine returns
the details of the profile as a dict back to Senlin API and eventually to the
requesting user. If the validation fails, Senlin engine returns an error
message describing the reason of the failure.


----------------
Listing Profiles
----------------

Senlin profiles an API for listing all profiles known to the Senlin engine.
When querying the profiles, users can provide any of the following parameters:

- ``filters``: a map of key-value pairs to filter profiles, where each key can
  be one of the following word and the value(s) are for the Senlin engine to
  match against all profiles.

  - ``name``: profile name for matching;
  - ``type``: profile type for matching;
  - ``created_time``: timestamp of profile creation for matching;
  - ``updated_time``: timestamp of last update operation;
  - ``deleted_time``: timestamp of profile deletion;
  - ``permission``: a string for profile permission matching;
  - ``metadata``: a string for matching profile metadata.

- ``limit``: an integer that specifies the maximum number of records to be
  returned from the API call;
- ``marker``: a string specifying the UUID of the last seen record; only those
  records that appear after the given value will be returned;
- ``sort_keys``: a list of field names on which the resulted list will be
  sorted;
- ``sort_dir``: a string giving the sorting direction which can take value
  ``asc`` or ``desc``.
- ``show_deleted``: a boolean flag indicating whether a profile list include
  those deleted ones.

If there are profiles matching the query criteria, Senlin API returns a list
named ``profiles`` where each entry is a JSON map containing details about a
profile object. Otherwise, an empty list or an error message will be returned
depending on whether the query was well formed.


-----------------
Getting A Profile
-----------------

A user can provide one of the following values in attempt to retrieve the
details of a specific profile.

- Profile UUID: Query is performed strictly based on the UUID value given. This
  is the most precise query supported in Senlin.
- Profile name: Senlin allows multiple profiles to have the same name. It is
  user's responsibility to avoid name conflicts if needed. Senlin engine will
  return a message telling users that multiple profiles found matching this
  name if the provided name cannot uniquely identify a profile.
- short ID: Considering that UUID is a long string not so convenient to input,
  Senlin supports a short version of UUIDs for query. Senlin engine will use
  the provided string as a prefix to attempt a matching in the database. When
  the "ID" is long enough to be unique, the details of the matching profile is
  returned, or else Senlin will return an error message indicating that
  multiple profiles were found matching the specified short ID.


------------------
Updating A Profile
------------------

Once a profile object is created, a user can request its properties to be
updated. Updates to the ``name``, ``permission`` or ``metadata`` properties
are applied on the specified profile object directly, however, updates to the
``spec`` property of a profile object will result in the creation of a new
profile object.

When ``spec`` is specified as one of the properties for update, Senlin always
try create a new profile object. This is a design consideration to make
profiles used by clusters and nodes easier to manage. Note that the newly
created profile will have the same name as the old profile if a new name is
not provided.


------------------
Deleting A Profile
------------------

A user can provide one of profile UUID, profile name or a short ID of a
profile when requesting a profile object to be deleted. Senlin engine will
check if there are still any clusters or nodes using the specific profile.
Since a profile in use cannot be deleted, if any such clusters or nodes are
found, an error message will be returned to user.

In current design, Senlin profiles are always soft-deleted. That means you can
still list them using the ``show_deleted`` parameter in the ``profile_list``
API.
