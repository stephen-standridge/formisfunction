import makeHashMap from '../utils/makeHashMap';
import {List} from 'immutable';
export const assets = makeHashMap( require.context("../../assets", true, /^\.\/.*\.js$/) );

function locatePieceContext( endpoint ){
	return assets.filter(( dir, index )=>{
		return index == endpoint || dir.has( endpoint )
	})
}
function determineSelected( pieces, endpoint ){
	return pieces.has(endpoint) ? endpoint : ''
}

export function getPiecesAndPiece( endpoint ){
	let locatedSection = locatePieceContext( endpoint );
	let locatedPieces = locatedSection.first();
	let sectionName = List(locatedSection.keys())
	sectionName = sectionName.first()
  return new Promise( function(resolve, reject){
  	resolve({ pieces: locatedPieces.toJS(), selectedPiece: determineSelected( locatedPieces, endpoint ), selectedSection: sectionName  });
  })
}
