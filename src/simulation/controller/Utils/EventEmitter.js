/**
 * EventEmitter class to manage event-driven architecture.
 * @class
 */
class EventEmitter {
    /**
    * Creates an instance of EventEmitter.
    *
    * This constructor initializes the callbacks object, which is used to store event listeners.
    * The `base` namespace is initialized as an empty object to hold default event listeners.
    */
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }
    /**
     * Registers an event listener for one or more events.
     * @param {string} _names - A string of event names separated by spaces.
     * @param {Function} callback - The function to be called when the event is triggered.
     * @returns {EventEmitter} The current instance of EventEmitter.
     */
    on(_names, callback) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }
        if (typeof callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }
        const names = this.resolveNames(_names);
        names.forEach((_name) => {
            const name = this.resolveName(_name);
            if (!(this.callbacks[name.namespace] instanceof Object))
                this.callbacks[name.namespace] = {};
            if (!(this.callbacks[name.namespace][name.value] instanceof Array))
                this.callbacks[name.namespace][name.value] = [];
            this.callbacks[name.namespace][name.value].push(callback);
        });
        return this;
    }
    /**
     * Removes event listeners for one or more events.
     * @param {string} _names - A string of event names separated by spaces.
     * @returns {EventEmitter} The current instance of EventEmitter.
     */
    off(_names) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong name');
            return false;
        }
        const names = this.resolveNames(_names);
        names.forEach((_name) => {
            const name = this.resolveName(_name);
            if (name.namespace !== 'base' && name.value === '') {
                delete this.callbacks[name.namespace];
            }
            else {
                if (name.namespace === 'base') {
                    for (const namespace in this.callbacks) {
                        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
                            delete this.callbacks[namespace][name.value];
                            if (Object.keys(this.callbacks[namespace]).length === 0)
                                delete this.callbacks[namespace];
                        }
                    }
                }
                else if (this.callbacks[name.namespace] instanceof Object && this.callbacks[name.namespace][name.value] instanceof Array) {
                    delete this.callbacks[name.namespace][name.value];
                    if (Object.keys(this.callbacks[name.namespace]).length === 0)
                        delete this.callbacks[name.namespace];
                }
            }
        });
        return this;
    }
    /**
     * Calls all event listeners for a given event.
     * @param {string} _name - The name of the event.
     * @param {any[]} [_args] - The arguments to pass to the event listeners.
     * @returns {any} The result of the event listeners.
     */
    trigger(_name, _args) {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name');
            return false;
        }
        let finalResult = null;
        let result = null;
        const args = !(_args instanceof Array) ? [] : _args;
        let nameArray = this.resolveNames(_name);
        let name = this.resolveName(nameArray[0]);
        if (name.namespace === 'base') {
            for (const namespace in this.callbacks) {
                if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
                    this.callbacks[namespace][name.value].forEach((callback) => {
                        result = callback.apply(this, args);
                        if (typeof finalResult === 'undefined') {
                            finalResult = result;
                        }
                    });
                }
            }
        }
        else if (this.callbacks[name.namespace] instanceof Object) {
            if (name.value === '') {
                console.warn('wrong name');
                return this;
            }
            this.callbacks[name.namespace][name.value].forEach((callback) => {
                result = callback.apply(this, args);
                if (typeof finalResult === 'undefined')
                    finalResult = result;
            });
        }
        return finalResult;
    }
    /**
     * Resolves a string of event names into an array of individual names.
     * @param {string} _names - A string of event names separated by spaces.
     * @returns {string[]} An array of individual event names.
     */
    resolveNames(_names) {
        let names = _names;
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        names = names.replace(/[,/]+/g, ' ');
        names = names.split(' ');
        return names;
    }
    /**
     * Resolves a single event name into its components.
     * @param {string} name - The event name.
     * @returns {Name} An object containing the original name, the event value, and the namespace.
     */
    resolveName(name) {
        const newName = {};
        const parts = name.split('.');
        newName.original = name;
        newName.value = parts[0];
        newName.namespace = 'base';
        if (parts.length > 1 && parts[1] !== '') {
            newName.namespace = parts[1];
        }
        return newName;
    }
}
export default EventEmitter;
