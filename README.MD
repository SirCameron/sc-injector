## Why
mostly because I like to ensure I'm getting the same instance of something I create across my app.
And also, because I hate having to refer to modules I'm importing by their path each time.

I'm sure there are other solutions - maybe even some better or some standard ones - but I like this approach and thought others could use it.

# Use

```
var injector = require('sc-injector');
// or
import injector from 'sc-injector'

injector.set('something', function(){
	return 'something';
})

injector.set('someclass', function(){
	return new Class();
})

var something = injector.inject('something')
// 'something'

var class = injector.inject('someclass')
// same instance of Class

var classAgain = injector.inject('someclass')
// same instance again... 
```

# Basic Autoloading
```
injector.configure({
	autoload: {enable: true, basePath: __dirname}
})

var bla = injector.inject('somepath/somedir/module.js')
// or
var bla = injector.inject('somepath/somedir'); // where somedir has within it an index.js 
```