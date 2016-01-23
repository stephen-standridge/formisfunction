import LineDispatcher from '../LineDispatcher';
import {EventEmitter} from 'events';
import {Tree} from 'basicTree';
import LineTemplate from '../constants/Linework';

const CHANGE_EVENT = 'change';
let _lines = new Tree({branches: 3, depth: 3});

function initialize( address ) {
	_lines.goTo( address ){

	}
}