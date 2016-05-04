import makeHashMap from '../utils/makeHashMap';
import {List} from 'immutable';
export const assets = makeHashMap( require.context("../../assets", true, /^\.\/.*\.js$/) );

function locatePieceContext( endpoint ){
	return assets.filter(( dir, index )=>{
		return index == endpoint || dir.has( endpoint )
	})
}
function determineSelected( pieces, endpoint ){
	return pieces.has(endpoint) ? endpoint : undefined
}

export function getPiecesAndPiece( endpoint ){
	let locatedPieces = locatePieceContext( endpoint ).first();
	let returnedPieces = List(locatedPieces.values() ).toJS();
  return { pieces: returnedPieces, selected: determineSelected( locatedPieces, endpoint )  };
}
