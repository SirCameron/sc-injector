var path = require('path')

var factories = {}
var instances = {}
var configuration = {
	autoload: {
		enable: false,
		basePath: './'
	}
}

function __configure(config, configuration){
	Object.keys(config).map(function(key){
		if (typeof config[key] == 'object' && Object.keys(config[key]).length > 0){
			if (!(key in configuration)){
				configuration[key] = config[key]	
			}
			else{
				__configure(config[key], configuration[key])
			}
		}
		else{
			if (key in configuration){
				configuration[key] = config[key]
			}
		}
	})
}

module.exports = {
	configure: function(config){
		__configure(config, configuration)
	},

	getConfig: function(){
		return configuration
	},

	inject: function(key){
		if (key in instances){
			return instances[key]
		}
		if (key in factories){
			if (typeof factories[key] == 'function'){
				instances[key] = factories[key](this)	
			}
			else{
				instances[key] = factories[key]
			}
			return instances[key]
		}

		if (configuration.autoload.enable){
			try{
				var dependency = require(path.resolve(configuration.autoload.basePath, key))
				instances[key] = dependency
				return dependency
			}
			catch(e){
				throw new Error('Unable to autoload "' + key + '" in "' + configuration.autoload.basePath + '"')
			}
		}

		throw new Error('Nothing found for "' + key + '"')
	},

	set: function(key, func){
		factories[key] = func
	}
}
