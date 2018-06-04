const expect = require('chai').expect
const should = require('chai').should()

const injector = require('../index.js')

describe('Injector', () => {
	describe('"configuration"', () => {
		it('should not set non-existent configuration', () => {
	  		injector.configure({nothing: 'bla'})
	  		
	  		var config = injector.getConfig()
	  		expect(config.nothing).to.be.a('undefined')
		})

		it('should correctly set configuration', () => {
	  		injector.configure({autoload: {enable: true, basePath: '/here'}})

	  		var config = injector.getConfig()
	  		expect(config.autoload.enable).to.equal(true)
	  		expect(config.autoload.basePath).to.equal('/here')
		})
	})

	describe('"setting, getting"', () => {
		it('should set and get simple string', () => {
	  		injector.set('string', 'something')

	  		expect(injector.inject('string')).to.equal('something')
		})

		it('should set and get the same instance', () => {
	  		injector.set('date', function(){
	  			return Math.random()
	  		})

	  		expect(injector.inject('date') == injector.inject('date')).to.equal(true)
		})

		it('should set and get a function', () => {
	  		injector.set('func', function(){
	  			return function(){
	  				return true
	  			}
	  		})

	  		expect(injector.inject('func')).to.be.a('function')
	  		expect(injector.inject('func')()).to.equal(true)
		})

		it('should not find an instance', () => {
			injector.configure({autoload: {enable: false}})
	  		
	  		expect(()=>{injector.inject('nothing')}).to.throw()
		})
	})

	describe('"autoloading"', () => {
		it('should fail to autoload', () => {
	  		injector.configure({autoload: {enable: true, basePath: '/'}})
	  		expect(()=>{injector.inject('autoload/nomodule')}).to.throw()
		})

		it('should find module to autoload', () => {
	  		injector.configure({autoload: {enable: true, basePath: __dirname}})
	  		expect(injector.inject('autoload/module')).to.equal('hello')
		})
	})
})