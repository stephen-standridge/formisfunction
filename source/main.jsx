import ReactDom from 'react-dom';
import React from 'react';
import PathsComponent from './components/paths.jsx';
import Path from './tapestry/Path.js'
import {lines, verticals, firstVerts, secondVerts, thirdVerts, fourthVerts, fifthVerts} from '../styles/background-line-data.js';
import {positions, space, firstUnique, firstSpace, firstOrSecond, secondUnique, secondSpace, secondOrThird, thirdSpace, thirdUnique} from '../styles/space-tree-data.js';

const PATHS = ['test', 'test2'];

window.lines = lines;
window.verticals = verticals;
window.firstVerts = firstVerts;
window.secondVerts = secondVerts;
window.thirdVerts = thirdVerts;
window.fourthVerts = fourthVerts;
window.fifthVerts = fifthVerts;

window.positions = positions;
window.space = space;
window.firstSpace = firstSpace;
window.firstUnique = firstUnique;
window.secondSpace = secondSpace;
window.secondUnique = secondUnique;
window.thirdSpace = thirdSpace;
window.thirdUnique = thirdUnique;
window.firstOrSecond = firstOrSecond;
window.secondOrThird = secondOrThird;

ReactDom.render(<PathsComponent paths={PATHS} />, document.getElementById('tapestry'))