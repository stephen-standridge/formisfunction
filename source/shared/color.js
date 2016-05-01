class Color {
	constructor(r,g,b,a){
		this.r = r 
		this.g = g
		this.b = b 
		this.a = a
	}
	generateRandomValue(){
		return ( 255 * Math.random() ).toFixed(0)
	}
	rgba( arg = this ){
		return `rgba(${arg.r}, ${arg.g}, ${arg.b}, ${arg.a})`
	}
	rybRprob( seed ){
		return 1.0 - Math.ceil( Math.abs(seed - 0.25) + Math.abs(0.75 - seed) - Math.abs(0.75 - 0.25) )	
	}		
	rybGprob( seed ){
		return 1.0 - Math.ceil( Math.abs(seed - 0.5) + Math.abs(0.75 - seed) - Math.abs(0.75 - 0.5) )		
	}	
	rybBprob( seed ){
		return 1.0 - Math.min( Math.ceil( Math.abs(seed - 0.75) + Math.abs(1.0 - seed) - Math.abs(1.0 - 0.75)	 ), 1.0) 		
	}
	rybRandom(){
		let seed = Math.random();
		let returned = {};
		returned.r = 255 * this.rybRprob( seed )
		returned.g = 255 * this.rybGprob( seed )
		returned.b = 255 * this.rybBprob( seed )
		returned.a = 1
		return new Color( returned.r, returned.g, returned.b, returned.a )
	}
	rgbaInvert( percent ){
		// let inverse = 255 * percent/100;
		// `rgba(${inverse - arg.r}, ${inverse -arg.g}, ${inverse -arg.b}, ${inverse -arg.a})`
	}
	cmyRandom(){
		// results are 255 in 2, 0 in one
	}
	rgbRandom(){
		// results are 255 in r, g, or b
	}
	white(){
		return new Color( 255, 255, 255, 1 )
	}
}

export default Color