requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        dist: "../dist",
        jquery: "jquery/dist/jquery",
        knockout: "knockout/dist/knockout",
        subscriptionsManager: "../dist/knockout-subscriptions-manager"
    },
    shim: {

    }
});

requirejs(["knockout", "subscriptionsManager"], function(ko, SubscriptionsManager){
    
    var observable1 = ko.observable("Observable 1");
    var observable2 = ko.observable("Observable 2");
    var observable3 = ko.observable("Observable 3");

    var manager = new SubscriptionsManager();

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

    observable1("New Value");
    observable2("New Value");
    observable3("New Value");

    manager.disposeAll();

    observable1("New Value 2");
    observable2("New Value 2");
    observable3("New Value 2");

});