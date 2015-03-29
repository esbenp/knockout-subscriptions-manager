[![Build Status](https://travis-ci.org/esbenp/knockout-subscriptions-manager.svg?branch=master)](https://travis-ci.org/esbenp/knockout-subscriptions-manager)
# knockout-subscriptions-manager

A small manager to store and dispose multiple knockout.js subscriptions

# Dependencies

* jQuery >= 1.1.4 (used for $.extend)

# Installation
Can be installed via bower package

```
bower install --save knockout-subscriptions-manager
```
... or by cloning the repository

```
git clone git@github.com:esbenp/knockout-subscriptions-manager.git
```
... or by grabbing a zip of the latest release

# Small example

See examples directory for more

```javascript
var manager = new SubscriptionsManager();

var observable1 = ko.observable("Observable 1");
var observable2 = ko.observable("Observable 2");
var observable3 = ko.observable("Observable 3");

manager.addSubscription(observable1.subscribe(function(newValue){
  console.log("Observable 1 value changed");
}));

var subscriptions = [
  observable2.subscribe(function(newValue){
    console.log("Observable 2 value changed");
  }),
  observable3.subscribe(function(newValue){
    console.log("Observable 3 value changed");
  })
];

manager.addSubscriptions(subscriptions);
manager.disposeAll();
```

# License
Copyright © 2015 Esben Petersen & Contributors

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
