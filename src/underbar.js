(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === 0) {
      return [];
    }
    return n === undefined ? array[array.length -1] : array.slice(-n)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection)
      }
    }else if(typeof collection === "object"){
      for(var key in collection) {
        iterator(collection[key], key, collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(element, index) {
      if(test(element, index)) {
        result.push(element);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // var result = [];

    // _.filter(collection, function(elem, index) {
    //   if(!test(elem)) {
    //     result.push(elem);
    //   }
    // });
    // return result;
    return _.filter(collection, function(elem) {
      return !test(elem)
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    //create a duplicate array so we don't mutate the input array
    var copiedArray = array.slice();
    //create an empty storage array to store unique element
    var result = [];
    //create a storage object so we can use it to check property
    var storage = {};
    //loop through the copied array
    _.each(copiedArray, function(elem, index) {
      //check if the property of elem exist in the
      //storage object to keep track of uniqueness
      if(!storage[elem]) {
        //if don't exist then save elem as object property as tracker
        storage[elem] = 1;
        //and push the elem to result
        result.push(elem);
      }
    });
    //return result at the end
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];

    _.each(collection, function(elem, index) {
      result.push(iterator(elem, index));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //var copiedCollection = collection.slice();

    if(accumulator === undefined) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }

    _.each(collection, function(elem, index) {
      accumulator = iterator(accumulator, elem);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(accumulator, currElem) {
      if(iterator === undefined) {
        if(currElem !== accumulator){
          accumulator = false;
        }
      }
      else if(!iterator(currElem, accumulator)) {
        accumulator = false;
      }
      return accumulator;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //start with a false statement and if one element is true it will return true
    var state = false;
    //check if iterator is passed in
    if(iterator === undefined){
      //if not passed in then perform compairson to the element itself
      _.every(collection, function(elem) {
        if(elem) {
          //if true set state to true
          state = true;
        }
      });
      //but if iterator is passed in
    } else {
      //go through the element and compair with iterator
      _.every(collection, function(elem) {
        if(iterator(elem)) {
          //if elem is true set state to true
          state = true;
        }
      });
    }
      //return state back to user
      return state;
    };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var extenedObj = obj;
    //we need to create a array of the argument objects
    var argumentObj = Array.prototype.slice.call(arguments, 1);
    //travers through the list of arguments object and get access to each object
    _.each(argumentObj, function(argObj, index) {
      //travers through the argument object to access the values
      for(var key in argObj) {
        //assign the argument kay value pair to the original obj key value
        extenedObj[key] = argObj[key];
      }
    });
    return extenedObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //create and variable to store extended key value but still have original object property
    var extenedObj = obj;
    //create a variable that saves the passed in argument object
    var argumentObj = Array.prototype.slice.call(arguments, 1);
    //travers through the argeument object list
    _.each(argumentObj, function(argObj, index) {
      //travers throught the argument object to access the key
      for(var key in argObj) {
      //check if extended object have the same property
      if(!(key in extenedObj)){
          //assign the argument kay value pair to the original obj key value
          extenedObj[key] = argObj[key];
        }
      }
    })
    return extenedObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //create a cache object to store the information
    var cache = {};
    //memoize should return a function
    return function(){

    //create a copied array of arguments list
    var argList = [Array.prototype.slice.call(arguments), arguments.length];
    //check to see if argument lise existed in the cache property
    if(!cache[argList]){
      //assign the argList to be the key and the invoked value to be the value of cache
      cache[argList] = func.apply(this, arguments)
      //return the invoked vale from cache memory
        return cache[argList]
      } else {
        //just return the cached save value
        return cache[argList]
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //copied of argument but filter out the first 2 arguments
    var copiedArguments = Array.prototype.slice.call(arguments, 2);
      //use setTimeout method to delay time and to invoke function
      //we need a wraper function so the argument function can be sucessfully pass in
      //with out being invoked before it is passed in
      //also since the arguments to be pass in to the inner function is an array, not a single value
      //we can can't use .call with the function, but use .apply for the function and pass in the array arguments
      return setTimeout(function() {func.apply(this, copiedArguments)}, wait);
    };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //create a copied array
    var copiedArray = Array.prototype.slice.call(array);
    //create a temp value for swapping
    var temp;
    //create a shuffled index
    var shuffledIndex = Math.floor(Math.random() * copiedArray.length);
    //travers through the original array
    for(var i = 0; i < copiedArray.length; i++) {
      temp = copiedArray[i];
      copiedArray[i] = copiedArray[shuffledIndex];
      copiedArray[shuffledIndex] = temp;
    }
    return copiedArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    //create a result array
    var result = [];
      //loop through the collection to access each element
      for(var i = 0; i < collection.length; i++) {
    //check to see if functionOrKey is a 'function' or 'method'
    if(typeof functionOrKey === 'function') {
      //if it is method then pass the arguments to the function useing apply()
      result.push(functionOrKey.apply(collection[i]));
    }
    //but if functionOrKey is a method
    if(typeof functionOrKey === 'string') {
        //then call and invoke the method property from each object
        result.push(collection[i][functionOrKey]());
      }
    }
    //return an array of invoked value
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    //create result array
    var result = [];
    //first we have to iterate through the nested array
    for(var i = 0; i < nestedArray.length; i++) {
      //SET BASE CASE!!!!!
      //check to see if elem is not an array
      if(!Array.isArray(nestedArray[i])) {
        //push the element to result
        result.push(nestedArray[i])
        //but if elem is an array
      } else {
        //pass elem in back to flatten function to recurse and concat the
        //value to the result
        result = result.concat(_.flatten(nestedArray[i]))
      }
    }
    //return result back to user
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
