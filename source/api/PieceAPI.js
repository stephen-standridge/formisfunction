import { fetchPiece, fetchPieceArray } from '../utils/APIUtils';

export function getPiece(piece, url = `pieces/${piece}`) {
  return fetchPiece(url);
}
