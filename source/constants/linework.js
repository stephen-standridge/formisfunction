import {Map} from 'immutable';
export const InitialLinework= Map({
});
export const DEG_TO_RAD = Math.PI / 180;


//need to determine what data a line has intrinsically.

//immutable
// level + node (used to determine area and offset )

//changed over time
// core classes (darkness, animation)
// raw directions (not actual numbers, relational to area)

//changed by user input
// delegated area (entire area line can exist in)
// delegated offset (relational to whole space)
// delegated flip (mirrored?)
// delegated rotate 


