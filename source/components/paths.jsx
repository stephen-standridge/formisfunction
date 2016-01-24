import React from 'react';

let PathsComponent = React.createClass({
	getInitialState: function(){
		return { paths: this.props.paths }
	},
	render: function(){
		return <svg height={"500"} width={"500"}>
							{
								this.state.paths.map(( p, i )=>{
									return <path key={i} d={p} style={ {fill: 'none', stroke: 'black'}} /> 
								})
							}
						</svg>
	}
})

export default PathsComponent