/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/Observer.js":
/*!***************************************!*\
  !*** ./node_modules/rxjs/Observer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.empty = {\n    closed: true,\n    next: function (value) { },\n    error: function (err) { throw err; },\n    complete: function () { }\n};\n//# sourceMappingURL=Observer.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/Observer.js?");

/***/ }),

/***/ "./node_modules/rxjs/Subscriber.js":
/*!*****************************************!*\
  !*** ./node_modules/rxjs/Subscriber.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar isFunction_1 = __webpack_require__(/*! ./util/isFunction */ \"./node_modules/rxjs/util/isFunction.js\");\nvar Subscription_1 = __webpack_require__(/*! ./Subscription */ \"./node_modules/rxjs/Subscription.js\");\nvar Observer_1 = __webpack_require__(/*! ./Observer */ \"./node_modules/rxjs/Observer.js\");\nvar rxSubscriber_1 = __webpack_require__(/*! ./symbol/rxSubscriber */ \"./node_modules/rxjs/symbol/rxSubscriber.js\");\n/**\n * Implements the {@link Observer} interface and extends the\n * {@link Subscription} class. While the {@link Observer} is the public API for\n * consuming the values of an {@link Observable}, all Observers get converted to\n * a Subscriber, in order to provide Subscription-like capabilities such as\n * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for\n * implementing operators, but it is rarely used as a public API.\n *\n * @class Subscriber<T>\n */\nvar Subscriber = (function (_super) {\n    __extends(Subscriber, _super);\n    /**\n     * @param {Observer|function(value: T): void} [destinationOrNext] A partially\n     * defined Observer or a `next` callback function.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     */\n    function Subscriber(destinationOrNext, error, complete) {\n        _super.call(this);\n        this.syncErrorValue = null;\n        this.syncErrorThrown = false;\n        this.syncErrorThrowable = false;\n        this.isStopped = false;\n        switch (arguments.length) {\n            case 0:\n                this.destination = Observer_1.empty;\n                break;\n            case 1:\n                if (!destinationOrNext) {\n                    this.destination = Observer_1.empty;\n                    break;\n                }\n                if (typeof destinationOrNext === 'object') {\n                    if (destinationOrNext instanceof Subscriber) {\n                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;\n                        this.destination = destinationOrNext;\n                        this.destination.add(this);\n                    }\n                    else {\n                        this.syncErrorThrowable = true;\n                        this.destination = new SafeSubscriber(this, destinationOrNext);\n                    }\n                    break;\n                }\n            default:\n                this.syncErrorThrowable = true;\n                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);\n                break;\n        }\n    }\n    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };\n    /**\n     * A static factory for a Subscriber, given a (potentially partial) definition\n     * of an Observer.\n     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)\n     * Observer represented by the given arguments.\n     */\n    Subscriber.create = function (next, error, complete) {\n        var subscriber = new Subscriber(next, error, complete);\n        subscriber.syncErrorThrowable = false;\n        return subscriber;\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `next` from\n     * the Observable, with a value. The Observable may call this method 0 or more\n     * times.\n     * @param {T} [value] The `next` value.\n     * @return {void}\n     */\n    Subscriber.prototype.next = function (value) {\n        if (!this.isStopped) {\n            this._next(value);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `error` from\n     * the Observable, with an attached {@link Error}. Notifies the Observer that\n     * the Observable has experienced an error condition.\n     * @param {any} [err] The `error` exception.\n     * @return {void}\n     */\n    Subscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._error(err);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive a valueless notification of type\n     * `complete` from the Observable. Notifies the Observer that the Observable\n     * has finished sending push-based notifications.\n     * @return {void}\n     */\n    Subscriber.prototype.complete = function () {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._complete();\n        }\n    };\n    Subscriber.prototype.unsubscribe = function () {\n        if (this.closed) {\n            return;\n        }\n        this.isStopped = true;\n        _super.prototype.unsubscribe.call(this);\n    };\n    Subscriber.prototype._next = function (value) {\n        this.destination.next(value);\n    };\n    Subscriber.prototype._error = function (err) {\n        this.destination.error(err);\n        this.unsubscribe();\n    };\n    Subscriber.prototype._complete = function () {\n        this.destination.complete();\n        this.unsubscribe();\n    };\n    Subscriber.prototype._unsubscribeAndRecycle = function () {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        this._parent = null;\n        this._parents = null;\n        this.unsubscribe();\n        this.closed = false;\n        this.isStopped = false;\n        this._parent = _parent;\n        this._parents = _parents;\n        return this;\n    };\n    return Subscriber;\n}(Subscription_1.Subscription));\nexports.Subscriber = Subscriber;\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar SafeSubscriber = (function (_super) {\n    __extends(SafeSubscriber, _super);\n    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {\n        _super.call(this);\n        this._parentSubscriber = _parentSubscriber;\n        var next;\n        var context = this;\n        if (isFunction_1.isFunction(observerOrNext)) {\n            next = observerOrNext;\n        }\n        else if (observerOrNext) {\n            next = observerOrNext.next;\n            error = observerOrNext.error;\n            complete = observerOrNext.complete;\n            if (observerOrNext !== Observer_1.empty) {\n                context = Object.create(observerOrNext);\n                if (isFunction_1.isFunction(context.unsubscribe)) {\n                    this.add(context.unsubscribe.bind(context));\n                }\n                context.unsubscribe = this.unsubscribe.bind(this);\n            }\n        }\n        this._context = context;\n        this._next = next;\n        this._error = error;\n        this._complete = complete;\n    }\n    SafeSubscriber.prototype.next = function (value) {\n        if (!this.isStopped && this._next) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (!_parentSubscriber.syncErrorThrowable) {\n                this.__tryOrUnsub(this._next, value);\n            }\n            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._error) {\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(this._error, err);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, this._error, err);\n                    this.unsubscribe();\n                }\n            }\n            else if (!_parentSubscriber.syncErrorThrowable) {\n                this.unsubscribe();\n                throw err;\n            }\n            else {\n                _parentSubscriber.syncErrorValue = err;\n                _parentSubscriber.syncErrorThrown = true;\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.complete = function () {\n        var _this = this;\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._complete) {\n                var wrappedComplete = function () { return _this._complete.call(_this._context); };\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(wrappedComplete);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);\n                    this.unsubscribe();\n                }\n            }\n            else {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            this.unsubscribe();\n            throw err;\n        }\n    };\n    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            parent.syncErrorValue = err;\n            parent.syncErrorThrown = true;\n            return true;\n        }\n        return false;\n    };\n    SafeSubscriber.prototype._unsubscribe = function () {\n        var _parentSubscriber = this._parentSubscriber;\n        this._context = null;\n        this._parentSubscriber = null;\n        _parentSubscriber.unsubscribe();\n    };\n    return SafeSubscriber;\n}(Subscriber));\n//# sourceMappingURL=Subscriber.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/Subscriber.js?");

/***/ }),

/***/ "./node_modules/rxjs/Subscription.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/Subscription.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar isArray_1 = __webpack_require__(/*! ./util/isArray */ \"./node_modules/rxjs/util/isArray.js\");\nvar isObject_1 = __webpack_require__(/*! ./util/isObject */ \"./node_modules/rxjs/util/isObject.js\");\nvar isFunction_1 = __webpack_require__(/*! ./util/isFunction */ \"./node_modules/rxjs/util/isFunction.js\");\nvar tryCatch_1 = __webpack_require__(/*! ./util/tryCatch */ \"./node_modules/rxjs/util/tryCatch.js\");\nvar errorObject_1 = __webpack_require__(/*! ./util/errorObject */ \"./node_modules/rxjs/util/errorObject.js\");\nvar UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ \"./node_modules/rxjs/util/UnsubscriptionError.js\");\n/**\n * Represents a disposable resource, such as the execution of an Observable. A\n * Subscription has one important method, `unsubscribe`, that takes no argument\n * and just disposes the resource held by the subscription.\n *\n * Additionally, subscriptions may be grouped together through the `add()`\n * method, which will attach a child Subscription to the current Subscription.\n * When a Subscription is unsubscribed, all its children (and its grandchildren)\n * will be unsubscribed as well.\n *\n * @class Subscription\n */\nvar Subscription = (function () {\n    /**\n     * @param {function(): void} [unsubscribe] A function describing how to\n     * perform the disposal of resources when the `unsubscribe` method is called.\n     */\n    function Subscription(unsubscribe) {\n        /**\n         * A flag to indicate whether this Subscription has already been unsubscribed.\n         * @type {boolean}\n         */\n        this.closed = false;\n        this._parent = null;\n        this._parents = null;\n        this._subscriptions = null;\n        if (unsubscribe) {\n            this._unsubscribe = unsubscribe;\n        }\n    }\n    /**\n     * Disposes the resources held by the subscription. May, for instance, cancel\n     * an ongoing Observable execution or cancel any other type of work that\n     * started when the Subscription was created.\n     * @return {void}\n     */\n    Subscription.prototype.unsubscribe = function () {\n        var hasErrors = false;\n        var errors;\n        if (this.closed) {\n            return;\n        }\n        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;\n        this.closed = true;\n        this._parent = null;\n        this._parents = null;\n        // null out _subscriptions first so any child subscriptions that attempt\n        // to remove themselves from this subscription will noop\n        this._subscriptions = null;\n        var index = -1;\n        var len = _parents ? _parents.length : 0;\n        // if this._parent is null, then so is this._parents, and we\n        // don't have to remove ourselves from any parent subscriptions.\n        while (_parent) {\n            _parent.remove(this);\n            // if this._parents is null or index >= len,\n            // then _parent is set to null, and the loop exits\n            _parent = ++index < len && _parents[index] || null;\n        }\n        if (isFunction_1.isFunction(_unsubscribe)) {\n            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);\n            if (trial === errorObject_1.errorObject) {\n                hasErrors = true;\n                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?\n                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);\n            }\n        }\n        if (isArray_1.isArray(_subscriptions)) {\n            index = -1;\n            len = _subscriptions.length;\n            while (++index < len) {\n                var sub = _subscriptions[index];\n                if (isObject_1.isObject(sub)) {\n                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);\n                    if (trial === errorObject_1.errorObject) {\n                        hasErrors = true;\n                        errors = errors || [];\n                        var err = errorObject_1.errorObject.e;\n                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {\n                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));\n                        }\n                        else {\n                            errors.push(err);\n                        }\n                    }\n                }\n            }\n        }\n        if (hasErrors) {\n            throw new UnsubscriptionError_1.UnsubscriptionError(errors);\n        }\n    };\n    /**\n     * Adds a tear down to be called during the unsubscribe() of this\n     * Subscription.\n     *\n     * If the tear down being added is a subscription that is already\n     * unsubscribed, is the same reference `add` is being called on, or is\n     * `Subscription.EMPTY`, it will not be added.\n     *\n     * If this subscription is already in an `closed` state, the passed\n     * tear down logic will be executed immediately.\n     *\n     * @param {TeardownLogic} teardown The additional logic to execute on\n     * teardown.\n     * @return {Subscription} Returns the Subscription used or created to be\n     * added to the inner subscriptions list. This Subscription can be used with\n     * `remove()` to remove the passed teardown logic from the inner subscriptions\n     * list.\n     */\n    Subscription.prototype.add = function (teardown) {\n        if (!teardown || (teardown === Subscription.EMPTY)) {\n            return Subscription.EMPTY;\n        }\n        if (teardown === this) {\n            return this;\n        }\n        var subscription = teardown;\n        switch (typeof teardown) {\n            case 'function':\n                subscription = new Subscription(teardown);\n            case 'object':\n                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {\n                    return subscription;\n                }\n                else if (this.closed) {\n                    subscription.unsubscribe();\n                    return subscription;\n                }\n                else if (typeof subscription._addParent !== 'function' /* quack quack */) {\n                    var tmp = subscription;\n                    subscription = new Subscription();\n                    subscription._subscriptions = [tmp];\n                }\n                break;\n            default:\n                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');\n        }\n        var subscriptions = this._subscriptions || (this._subscriptions = []);\n        subscriptions.push(subscription);\n        subscription._addParent(this);\n        return subscription;\n    };\n    /**\n     * Removes a Subscription from the internal list of subscriptions that will\n     * unsubscribe during the unsubscribe process of this Subscription.\n     * @param {Subscription} subscription The subscription to remove.\n     * @return {void}\n     */\n    Subscription.prototype.remove = function (subscription) {\n        var subscriptions = this._subscriptions;\n        if (subscriptions) {\n            var subscriptionIndex = subscriptions.indexOf(subscription);\n            if (subscriptionIndex !== -1) {\n                subscriptions.splice(subscriptionIndex, 1);\n            }\n        }\n    };\n    Subscription.prototype._addParent = function (parent) {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        if (!_parent || _parent === parent) {\n            // If we don't have a parent, or the new parent is the same as the\n            // current parent, then set this._parent to the new parent.\n            this._parent = parent;\n        }\n        else if (!_parents) {\n            // If there's already one parent, but not multiple, allocate an Array to\n            // store the rest of the parent Subscriptions.\n            this._parents = [parent];\n        }\n        else if (_parents.indexOf(parent) === -1) {\n            // Only add the new parent to the _parents list if it's not already there.\n            _parents.push(parent);\n        }\n    };\n    Subscription.EMPTY = (function (empty) {\n        empty.closed = true;\n        return empty;\n    }(new Subscription()));\n    return Subscription;\n}());\nexports.Subscription = Subscription;\nfunction flattenUnsubscriptionErrors(errors) {\n    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);\n}\n//# sourceMappingURL=Subscription.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/Subscription.js?");

/***/ }),

/***/ "./node_modules/rxjs/observable.js":
/*!*****************************************!*\
  !*** ./node_modules/rxjs/observable.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar root_1 = __webpack_require__(/*! ./util/root */ \"./node_modules/rxjs/util/root.js\");\nvar toSubscriber_1 = __webpack_require__(/*! ./util/toSubscriber */ \"./node_modules/rxjs/util/toSubscriber.js\");\nvar observable_1 = __webpack_require__(/*! ./symbol/observable */ \"./node_modules/rxjs/symbol/observable.js\");\nvar pipe_1 = __webpack_require__(/*! ./util/pipe */ \"./node_modules/rxjs/util/pipe.js\");\n/**\n * A representation of any set of values over any amount of time. This is the most basic building block\n * of RxJS.\n *\n * @class Observable<T>\n */\nvar Observable = (function () {\n    /**\n     * @constructor\n     * @param {Function} subscribe the function that is called when the Observable is\n     * initially subscribed to. This function is given a Subscriber, to which new values\n     * can be `next`ed, or an `error` method can be called to raise an error, or\n     * `complete` can be called to notify of a successful completion.\n     */\n    function Observable(subscribe) {\n        this._isScalar = false;\n        if (subscribe) {\n            this._subscribe = subscribe;\n        }\n    }\n    /**\n     * Creates a new Observable, with this Observable as the source, and the passed\n     * operator defined as the new observable's operator.\n     * @method lift\n     * @param {Operator} operator the operator defining the operation to take on the observable\n     * @return {Observable} a new observable with the Operator applied\n     */\n    Observable.prototype.lift = function (operator) {\n        var observable = new Observable();\n        observable.source = this;\n        observable.operator = operator;\n        return observable;\n    };\n    /**\n     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.\n     *\n     * <span class=\"informal\">Use it when you have all these Observables, but still nothing is happening.</span>\n     *\n     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It\n     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is\n     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling\n     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often\n     * thought.\n     *\n     * Apart from starting the execution of an Observable, this method allows you to listen for values\n     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two\n     * following ways.\n     *\n     * The first way is creating an object that implements {@link Observer} interface. It should have methods\n     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create\n     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do\n     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also\n     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't\n     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will\n     * be left uncaught.\n     *\n     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.\n     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent\n     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,\n     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,\n     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes\n     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.\n     *\n     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.\n     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean\n     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback\n     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.\n     *\n     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.\n     * It is an Observable itself that decides when these functions will be called. For example {@link of}\n     * by default emits all its values synchronously. Always check documentation for how given Observable\n     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.\n     *\n     * @example <caption>Subscribe with an Observer</caption>\n     * const sumObserver = {\n     *   sum: 0,\n     *   next(value) {\n     *     console.log('Adding: ' + value);\n     *     this.sum = this.sum + value;\n     *   },\n     *   error() { // We actually could just remove this method,\n     *   },        // since we do not really care about errors right now.\n     *   complete() {\n     *     console.log('Sum equals: ' + this.sum);\n     *   }\n     * };\n     *\n     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.\n     * .subscribe(sumObserver);\n     *\n     * // Logs:\n     * // \"Adding: 1\"\n     * // \"Adding: 2\"\n     * // \"Adding: 3\"\n     * // \"Sum equals: 6\"\n     *\n     *\n     * @example <caption>Subscribe with functions</caption>\n     * let sum = 0;\n     *\n     * Rx.Observable.of(1, 2, 3)\n     * .subscribe(\n     *   function(value) {\n     *     console.log('Adding: ' + value);\n     *     sum = sum + value;\n     *   },\n     *   undefined,\n     *   function() {\n     *     console.log('Sum equals: ' + sum);\n     *   }\n     * );\n     *\n     * // Logs:\n     * // \"Adding: 1\"\n     * // \"Adding: 2\"\n     * // \"Adding: 3\"\n     * // \"Sum equals: 6\"\n     *\n     *\n     * @example <caption>Cancel a subscription</caption>\n     * const subscription = Rx.Observable.interval(1000).subscribe(\n     *   num => console.log(num),\n     *   undefined,\n     *   () => console.log('completed!') // Will not be called, even\n     * );                                // when cancelling subscription\n     *\n     *\n     * setTimeout(() => {\n     *   subscription.unsubscribe();\n     *   console.log('unsubscribed!');\n     * }, 2500);\n     *\n     * // Logs:\n     * // 0 after 1s\n     * // 1 after 2s\n     * // \"unsubscribed!\" after 2.5s\n     *\n     *\n     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,\n     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed\n     *  Observable.\n     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,\n     *  the error will be thrown as unhandled.\n     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.\n     * @return {ISubscription} a subscription reference to the registered handlers\n     * @method subscribe\n     */\n    Observable.prototype.subscribe = function (observerOrNext, error, complete) {\n        var operator = this.operator;\n        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);\n        if (operator) {\n            operator.call(sink, this.source);\n        }\n        else {\n            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));\n        }\n        if (sink.syncErrorThrowable) {\n            sink.syncErrorThrowable = false;\n            if (sink.syncErrorThrown) {\n                throw sink.syncErrorValue;\n            }\n        }\n        return sink;\n    };\n    Observable.prototype._trySubscribe = function (sink) {\n        try {\n            return this._subscribe(sink);\n        }\n        catch (err) {\n            sink.syncErrorThrown = true;\n            sink.syncErrorValue = err;\n            sink.error(err);\n        }\n    };\n    /**\n     * @method forEach\n     * @param {Function} next a handler for each value emitted by the observable\n     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise\n     * @return {Promise} a promise that either resolves on observable completion or\n     *  rejects with the handled error\n     */\n    Observable.prototype.forEach = function (next, PromiseCtor) {\n        var _this = this;\n        if (!PromiseCtor) {\n            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {\n                PromiseCtor = root_1.root.Rx.config.Promise;\n            }\n            else if (root_1.root.Promise) {\n                PromiseCtor = root_1.root.Promise;\n            }\n        }\n        if (!PromiseCtor) {\n            throw new Error('no Promise impl found');\n        }\n        return new PromiseCtor(function (resolve, reject) {\n            // Must be declared in a separate statement to avoid a RefernceError when\n            // accessing subscription below in the closure due to Temporal Dead Zone.\n            var subscription;\n            subscription = _this.subscribe(function (value) {\n                if (subscription) {\n                    // if there is a subscription, then we can surmise\n                    // the next handling is asynchronous. Any errors thrown\n                    // need to be rejected explicitly and unsubscribe must be\n                    // called manually\n                    try {\n                        next(value);\n                    }\n                    catch (err) {\n                        reject(err);\n                        subscription.unsubscribe();\n                    }\n                }\n                else {\n                    // if there is NO subscription, then we're getting a nexted\n                    // value synchronously during subscription. We can just call it.\n                    // If it errors, Observable's `subscribe` will ensure the\n                    // unsubscription logic is called, then synchronously rethrow the error.\n                    // After that, Promise will trap the error and send it\n                    // down the rejection path.\n                    next(value);\n                }\n            }, reject, resolve);\n        });\n    };\n    Observable.prototype._subscribe = function (subscriber) {\n        return this.source.subscribe(subscriber);\n    };\n    /**\n     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable\n     * @method Symbol.observable\n     * @return {Observable} this instance of the observable\n     */\n    Observable.prototype[observable_1.observable] = function () {\n        return this;\n    };\n    /* tslint:enable:max-line-length */\n    /**\n     * Used to stitch together functional operators into a chain.\n     * @method pipe\n     * @return {Observable} the Observable result of all of the operators having\n     * been called in the order they were passed in.\n     *\n     * @example\n     *\n     * import { map, filter, scan } from 'rxjs/operators';\n     *\n     * Rx.Observable.interval(1000)\n     *   .pipe(\n     *     filter(x => x % 2 === 0),\n     *     map(x => x + x),\n     *     scan((acc, x) => acc + x)\n     *   )\n     *   .subscribe(x => console.log(x))\n     */\n    Observable.prototype.pipe = function () {\n        var operations = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            operations[_i - 0] = arguments[_i];\n        }\n        if (operations.length === 0) {\n            return this;\n        }\n        return pipe_1.pipeFromArray(operations)(this);\n    };\n    /* tslint:enable:max-line-length */\n    Observable.prototype.toPromise = function (PromiseCtor) {\n        var _this = this;\n        if (!PromiseCtor) {\n            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {\n                PromiseCtor = root_1.root.Rx.config.Promise;\n            }\n            else if (root_1.root.Promise) {\n                PromiseCtor = root_1.root.Promise;\n            }\n        }\n        if (!PromiseCtor) {\n            throw new Error('no Promise impl found');\n        }\n        return new PromiseCtor(function (resolve, reject) {\n            var value;\n            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });\n        });\n    };\n    // HACK: Since TypeScript inherits static properties too, we have to\n    // fight against TypeScript here so Subject can have a different static create signature\n    /**\n     * Creates a new cold Observable by calling the Observable constructor\n     * @static true\n     * @owner Observable\n     * @method create\n     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor\n     * @return {Observable} a new cold observable\n     */\n    Observable.create = function (subscribe) {\n        return new Observable(subscribe);\n    };\n    return Observable;\n}());\nexports.Observable = Observable;\n//# sourceMappingURL=Observable.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/observable.js?");

/***/ }),

/***/ "./node_modules/rxjs/symbol/observable.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/symbol/observable.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar root_1 = __webpack_require__(/*! ../util/root */ \"./node_modules/rxjs/util/root.js\");\nfunction getSymbolObservable(context) {\n    var $$observable;\n    var Symbol = context.Symbol;\n    if (typeof Symbol === 'function') {\n        if (Symbol.observable) {\n            $$observable = Symbol.observable;\n        }\n        else {\n            $$observable = Symbol('observable');\n            Symbol.observable = $$observable;\n        }\n    }\n    else {\n        $$observable = '@@observable';\n    }\n    return $$observable;\n}\nexports.getSymbolObservable = getSymbolObservable;\nexports.observable = getSymbolObservable(root_1.root);\n/**\n * @deprecated use observable instead\n */\nexports.$$observable = exports.observable;\n//# sourceMappingURL=observable.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/symbol/observable.js?");

/***/ }),

/***/ "./node_modules/rxjs/symbol/rxSubscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/symbol/rxSubscriber.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar root_1 = __webpack_require__(/*! ../util/root */ \"./node_modules/rxjs/util/root.js\");\nvar Symbol = root_1.root.Symbol;\nexports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?\n    Symbol.for('rxSubscriber') : '@@rxSubscriber';\n/**\n * @deprecated use rxSubscriber instead\n */\nexports.$$rxSubscriber = exports.rxSubscriber;\n//# sourceMappingURL=rxSubscriber.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/symbol/rxSubscriber.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/UnsubscriptionError.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/util/UnsubscriptionError.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n/**\n * An error thrown when one or more errors have occurred during the\n * `unsubscribe` of a {@link Subscription}.\n */\nvar UnsubscriptionError = (function (_super) {\n    __extends(UnsubscriptionError, _super);\n    function UnsubscriptionError(errors) {\n        _super.call(this);\n        this.errors = errors;\n        var err = Error.call(this, errors ?\n            errors.length + \" errors occurred during unsubscription:\\n  \" + errors.map(function (err, i) { return ((i + 1) + \") \" + err.toString()); }).join('\\n  ') : '');\n        this.name = err.name = 'UnsubscriptionError';\n        this.stack = err.stack;\n        this.message = err.message;\n    }\n    return UnsubscriptionError;\n}(Error));\nexports.UnsubscriptionError = UnsubscriptionError;\n//# sourceMappingURL=UnsubscriptionError.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/UnsubscriptionError.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/errorObject.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/util/errorObject.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// typeof any so that it we don't have to cast when comparing a result to the error object\nexports.errorObject = { e: {} };\n//# sourceMappingURL=errorObject.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/errorObject.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isArray.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/util/isArray.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });\n//# sourceMappingURL=isArray.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/isArray.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/util/isFunction.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nfunction isFunction(x) {\n    return typeof x === 'function';\n}\nexports.isFunction = isFunction;\n//# sourceMappingURL=isFunction.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/isFunction.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/isObject.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nfunction isObject(x) {\n    return x != null && typeof x === 'object';\n}\nexports.isObject = isObject;\n//# sourceMappingURL=isObject.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/isObject.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/noop.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/noop.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n/* tslint:disable:no-empty */\nfunction noop() { }\nexports.noop = noop;\n//# sourceMappingURL=noop.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/noop.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/pipe.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/pipe.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar noop_1 = __webpack_require__(/*! ./noop */ \"./node_modules/rxjs/util/noop.js\");\n/* tslint:enable:max-line-length */\nfunction pipe() {\n    var fns = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        fns[_i - 0] = arguments[_i];\n    }\n    return pipeFromArray(fns);\n}\nexports.pipe = pipe;\n/* @internal */\nfunction pipeFromArray(fns) {\n    if (!fns) {\n        return noop_1.noop;\n    }\n    if (fns.length === 1) {\n        return fns[0];\n    }\n    return function piped(input) {\n        return fns.reduce(function (prev, fn) { return fn(prev); }, input);\n    };\n}\nexports.pipeFromArray = pipeFromArray;\n//# sourceMappingURL=pipe.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/pipe.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/root.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/root.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n// CommonJS / Node have global context exposed as \"global\" variable.\n// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake\n// the global \"global\" var for now.\nvar __window = typeof window !== 'undefined' && window;\nvar __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&\n    self instanceof WorkerGlobalScope && self;\nvar __global = typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g;\nvar _root = __window || __global || __self;\nexports.root = _root;\n// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.\n// This is needed when used with angular/tsickle which inserts a goog.module statement.\n// Wrap in IIFE\n(function () {\n    if (!_root) {\n        throw new Error('RxJS could not find any global context (window, self, global)');\n    }\n})();\n//# sourceMappingURL=root.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/root.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/toSubscriber.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/util/toSubscriber.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar Subscriber_1 = __webpack_require__(/*! ../Subscriber */ \"./node_modules/rxjs/Subscriber.js\");\nvar rxSubscriber_1 = __webpack_require__(/*! ../symbol/rxSubscriber */ \"./node_modules/rxjs/symbol/rxSubscriber.js\");\nvar Observer_1 = __webpack_require__(/*! ../Observer */ \"./node_modules/rxjs/Observer.js\");\nfunction toSubscriber(nextOrObserver, error, complete) {\n    if (nextOrObserver) {\n        if (nextOrObserver instanceof Subscriber_1.Subscriber) {\n            return nextOrObserver;\n        }\n        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {\n            return nextOrObserver[rxSubscriber_1.rxSubscriber]();\n        }\n    }\n    if (!nextOrObserver && !error && !complete) {\n        return new Subscriber_1.Subscriber(Observer_1.empty);\n    }\n    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);\n}\nexports.toSubscriber = toSubscriber;\n//# sourceMappingURL=toSubscriber.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/toSubscriber.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/tryCatch.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/tryCatch.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar errorObject_1 = __webpack_require__(/*! ./errorObject */ \"./node_modules/rxjs/util/errorObject.js\");\nvar tryCatchTarget;\nfunction tryCatcher() {\n    try {\n        return tryCatchTarget.apply(this, arguments);\n    }\n    catch (e) {\n        errorObject_1.errorObject.e = e;\n        return errorObject_1.errorObject;\n    }\n}\nfunction tryCatch(fn) {\n    tryCatchTarget = fn;\n    return tryCatcher;\n}\nexports.tryCatch = tryCatch;\n;\n//# sourceMappingURL=tryCatch.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./node_modules/rxjs/util/tryCatch.js?");

/***/ }),

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("var rxjs_observable__WEBPACK_IMPORTED_MODULE_0___namespace_cache;\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rxjs_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/observable */ \"./node_modules/rxjs/observable.js\");\n\nconsole.log(/*#__PURE__*/ (rxjs_observable__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (rxjs_observable__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(rxjs_observable__WEBPACK_IMPORTED_MODULE_0__, 2))));\nconsole.log(/*#__PURE__*/ (rxjs_observable__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (rxjs_observable__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(rxjs_observable__WEBPACK_IMPORTED_MODULE_0__, 2))));\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://youtube-designcourse-rxjs/./public/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/index.js");
/******/ 	
/******/ })()
;