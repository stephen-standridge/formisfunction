import ReactDom from 'react-dom';
import React from 'react';
import PathsComponent from './components/paths.jsx';
import Path from './tapestry/Path.js'
import {lines, verticals} from '../styles/background-line-data.js';

const PATHS = ['test', 'test2'];

window.lines = lines;
window.verticals = verticals;

ReactDom.render(<PathsComponent paths={PATHS} />, document.getElementById('tapestry'))