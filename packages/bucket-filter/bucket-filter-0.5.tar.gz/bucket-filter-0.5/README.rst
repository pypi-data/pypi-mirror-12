Bucket Filter
=============

A filtering library to present data that matches a series of conditional
expressions

--------------

Bucket filter is a python library that allows creating multiple buckets
each linked to a condition and having various data, each identified by a
unique ID. It then allows for combining various buckets in a serious of
conditinal operators and filters out those IDs that match a given
expression.


*   Currently supported operators is &(AND), ||(OR)
*   The library currenly only supports Boolean expressions

Example
-------

Lets say there are 3 buckets with conditions c1, c2, c3 as defined below

1. c1 –> id1, id2, id3
2. c2 –> id3, id4, id5
3. c3 –> id2, id3, id6

an expression

::

    C = c1 & (c2 || c3)

would result in

::

    ==> C = (id1, id2, id3) & (id3, id4, id5 id2, id6)

    ==> C = (id2, id3)

**NOTE**

1. The library does not evaluate individual conditions, only joins the
   filters as defined by the expression

   -  The library does an exact expression match, so if while
      registering one uses hasData=True, the library expects the same
      expression when evaluating

2. Standard evaluation rules apply, left to right, expressions in braces
   are done first
3. Elements in the bucket **MUST** have a accessible attribute *id* else
   will be evicted out of the bucket

--------------

License
=======

Licensed under the Apache License, Version 2.0 (the “License”); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.