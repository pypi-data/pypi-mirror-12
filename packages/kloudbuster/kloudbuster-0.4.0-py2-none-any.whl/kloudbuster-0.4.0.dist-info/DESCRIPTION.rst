========
Overview
========    

How good is your OpenStack data plane under real heavy load?

KloudBuster is a tool that can load the data plane of any Neutron OpenStack cloud at massive scale and can measure how well the cloud behaves under load.

Features
--------

* Neutron configuration agnostic (any encapsulation, any overlay, any plugin)
* Can load the data plane with one OpenStack cloud (single-cloud operations for L3 East-West scale) or 2 OpenStack clouds (dual-cloud operations with one cloud hosting the HTTP servers and the other loading HTTP traffic for L3 North-South scale testing) 
* User can specify any number of tenants, routers, networks (only limited by cloud capacity) and KloudBuster will stage all these resources in a way that makes sense for operational data plane traffic
* HTTP traffic load:
   * real HTTP servers (Nginx) running in real Linux images (Ubuntu14.04)
   * can specify any number of HTTP servers per tenant
   * high performance and highly scalable HTTP traffic generators to simulate huge number of HTTP users and TCP connections (hundreds of thousands to millions)
   * overall throughput and latency measurement for every single HTTP request (typically millions per run) using the open source HdrHistogram library
* Traffic shaping to specify on which links traffic should flow
* Highly efficient and scalable metric aggregation
* Can support periodic reporting and aggregation of results
* Automatic cleanup upon termination (by default)
* Manual cleanup script
* Server mode and REST interface:
   * allows KloudBuster to be driven by other programs
   * Swagger 2.0 YAML description of the REST interface
* Aggregated results provide an easy to understand way to assess the scale of the cloud under test
* KloudBuster VM images built using OpenStack DIB (Disk Image Builder)
* Verified to work on any OpenStack release starting from IceHouse

Limitations
-----------

* requires Neutron networking (does not support Nova networking)
* only supports HTTP traffic in this version

Contributions and Feedbacks
---------------------------

If you are interested in OpenStack Performance and Scale, contributions and feedbakcs are welcome!
The KloudBuster code is still relatively small in size and touches many different areas such as:

* backend control plane and data plane (python, C)
* frontend RESTful interface
* REST modeilizatiuon (swagger)
* Web User Interface (javascript)

If you have any feedbacks or would like to make small or large contributions, simply send an email to 
openstack-dev@lists.openstack.org with a '[kloudbuster]' tag in the subject.


Licensing
---------

KloudBuster is licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at `<http://www.apache.org/licenses/LICENSE-2.0>`_

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

KloudBuster VM images contain multi-open source license components


Links
-----

* Documentation: `<http://kloudbuster.readthedocs.org>`_
* Source: `<http://git.openstack.org/cgit/openstack/kloudbuster>`_
* Supports/Bugs: `<http://launchpad.net/kloudbuster>`_
* Mailing List: kloudbuster-core@lists.launchpad.net



