define(["jquery", "subscriptionsManager"], function(jQuery){
    describe("SubscriptionsManager", function(){
        var namespace = {};

        beforeEach(function(){
            namespace.managerWithoutSettings = new SubscriptionsManager();
            namespace.managerWithSettings = new SubscriptionsManager({
                throwErrorOnFailedDisposal: false
            });
        });

        it("should correctly set settings on initialization", function(){
            expect(namespace.managerWithoutSettings.settings.throwErrorOnFailedDisposal).toEqual(true);
            expect(namespace.managerWithSettings.settings.throwErrorOnFailedDisposal).toEqual(false);
        });

        it("should successfully add a single subscription", function(){
            namespace.managerWithoutSettings.addSubscription(function(){return "subscription"});
            expect(namespace.managerWithoutSettings.subscriptions[0]()).toEqual("subscription");
        });

        it("should add a single subscription to the dictionary if a key is given", function(){
            namespace.managerWithoutSettings.addSubscription(function(){return "subscription"}, "key");
            expect(namespace.managerWithoutSettings.dictionary.key()).toEqual("subscription");
        });

        it("should successfully add multiple subscriptions", function(){
            namespace.managerWithoutSettings.addSubscriptions([
                function(){return "subscription 1";},
                function(){return "subscription 2";}
            ]);
            expect(namespace.managerWithoutSettings.subscriptions[0]()).toEqual("subscription 1");
            expect(namespace.managerWithoutSettings.subscriptions[1]()).toEqual("subscription 2");
        });

        it("should successfully dispose a valid subscription given by key", function(){
            namespace.managerWithoutSettings.addSubscription({dispose: function(){return true}}, "key");
            namespace.managerWithoutSettings.dispose("key");
        });

        it("should throw an error if disposal of dictionary subscription failed and option is set", function(){
            var manager = new SubscriptionsManager({
                throwErrorOnFailedDisposal: true
            });
            manager.addSubscription({}, "key");
            expect(function(){manager.dispose("key")}).toThrowError(Error);
        });

        it("should successfully dispose an array of valid subscriptions", function(){
            for(var i=0; i<10; i++) {
                namespace.managerWithoutSettings.addSubscription({
                    dispose: function(){return true;}
                });
            }

            namespace.managerWithoutSettings.disposeAll();
        });

        it("should throw an error if a disposal failed and option is set", function(){
            var manager = new SubscriptionsManager({
                throwErrorOnFailedDisposal: true
            });
            manager.addSubscription({});
            expect(function(){manager.disposeAll()}).toThrowError(Error);
        });
    });
});