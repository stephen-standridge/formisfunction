import { fetchPiece, fetchPieceArray } from '../utils/APIUtils';

export function getPiece(piecePath, url = `pieces/${piecePath}.js`) {
	console.log(url)
  return fetchPiece(url);
}
