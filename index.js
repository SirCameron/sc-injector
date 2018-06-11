let configuration = {
	autoload: {
		enable: false,
		basePath: './'
	}
}

function __configure(config, _configuration){
	Object.keys(config).map(function(key){
		if (typeof config[key] == 'object' && Object.keys(config[key]).length > 0){
			if (!(key in _configuration)){
				_configuration[key] = config[key]	
			}
			else{
				__configure(config[key], _configuration[key])
			}
		}
		else{
			if (key in _configuration){
				_configuration[key] = config[key]
			}
		}
	})
}

class Injector {
	constructor(){
		this.factories = {}
		this.instances = {}
	}
	
	configure(config){
		__configure(config, configuration)
	}

	getConfig(){
		return configuration
	}

	inject(key){
		if (key in this.instances){
			return this.instances[key]
		}
		if (key in this.factories){
			if (typeof this.factories[key] == 'function'){
				this.instances[key] = this.factories[key](this)	
			}
			else{
				this.instances[key] = this.factories[key]
			}
			return this.instances[key]
		}

		// if (configuration.autoload.enable){
		// 	try{
		// 		var dependency = require(configuration.autoload.basePath + '/' + key)
		// 		this.instances[key] = dependency
		// 		return dependency
		// 	}
		// 	catch(e){
		// 		throw new Error('Unable to autoload "' + key + '" in "' + configuration.autoload.basePath + '"')
		// 	}
		// }

		throw new Error('Nothing found for "' + key + '"')
	}

	set(key, func){
		this.factories[key] = func
	}
}

module.exports.injector = new Injector()
