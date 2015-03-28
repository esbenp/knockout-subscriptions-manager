+(function($, scope){
    "use strict";

    var previousSubscriptionManager = scope.SubscriptionsManager;

    var SubscriptionsManager = function SubscriptionsManager(settings) {
        this.subscriptions = [];

        this.settings = $.extend({}, this.DEFAULT_SETTINGS, settings);
    };

    SubscriptionsManager.DEFAULT_SETTINGS = {
        throwErrorOnFailedDisposal: true
    };

    SubscriptionsManager.prototype.addSubscription = function addSubscription(subscription)
    {
        this.subscriptions.push(subscription);
    };

    SubscriptionsManager.prototype.addSubscriptions = function addSubscriptions(subscriptions)
    {
        if (!subscriptions instanceof Array) {
            throw Error('knockout-subscriptions-manager@addSubscriptions: Was expecting an array of subscriptions');
        }

        this.subscriptions = this.subscriptions.concat(subscriptions);

        return this;
    };

    SubscriptionsManager.prototype.disposeAll = function disposeAll()
    {
        for(var i in this.subscriptions) {
            if (this.settings.throwErrorOnFailedDisposal && !(typeof this.subscriptions[i].dispose === 'function')) {
                throw Error('knockout-subscriptions-manager@disposeAll: Subscription was not disposal ' + 
                            '(had no dispose function)');
            }

            this.subscriptions[i].dispose();
        }

        return this;
    };

    SubscriptionsManager.noConflict = function noConflict()
    {
        scope.SubscriptionsManager = previousSubscriptionManager;
        return SubscriptionsManager;
    }

    scope.SubscriptionsManager = SubscriptionsManager;

})(jQuery, this);