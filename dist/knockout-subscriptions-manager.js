(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.SubscriptionsManager = factory(root.jQuery);
  }
}(this, function($) {
"use strict";

var previousSubscriptionManager = window.SubscriptionsManager;

var SubscriptionsManager = function SubscriptionsManager(settings) {
    this.dictionary = {};
    this.subscriptions = [];

    this.settings = $.extend({}, SubscriptionsManager.DEFAULT_SETTINGS, settings);
};

SubscriptionsManager.DEFAULT_SETTINGS = {
    throwErrorOnFailedDisposal: true
};

SubscriptionsManager.prototype.addSubscription = function addSubscription(subscription, key)
{
    if (subscription !== false) {
        this.subscriptions.push(subscription);

        if (key !== undefined) {
            this.dictionary[key] = subscription;
        }
    }
};

SubscriptionsManager.prototype.addSubscriptions = function addSubscriptions(subscriptions)
{
    if (subscriptions === false) {
        return;
    }

    if (!subscriptions instanceof Array) {
        throw Error('knockout-subscriptions-manager@addSubscriptions: Was expecting an array of subscriptions');
    }

    this.subscriptions = this.subscriptions.concat(subscriptions);

    return this;
};

SubscriptionsManager.prototype.dispose = function dispose(key)
{
    var listener = this.dictionary[key];
    if (this.settings.throwErrorOnFailedDisposal && (listener === undefined || !(typeof listener.dispose === "function"))) {
        throw Error('knockout-subscriptions-manager@dispose: A valid listener with key ' + key + ' was not found.');
    }

    listener.dispose();
}

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
    window.SubscriptionsManager = previousSubscriptionManager;
    return SubscriptionsManager;
}
return SubscriptionsManager;
}));
