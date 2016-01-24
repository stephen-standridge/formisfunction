import ReactDom from 'react-dom';
import React from 'react';
import PathsComponent from './components/paths.jsx';
import Path from './tapestry/Path.js'

const PATHS = ['test', 'test2'];

ReactDom.render(<PathsComponent paths={PATHS} />, document.getElementById('tapestry'))