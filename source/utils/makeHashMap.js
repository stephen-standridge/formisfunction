import { Map, fromJS } from 'immutable';

export default function makeHashMap(requireContext) {
	let returned = Map({}), trimmed;
	requireContext.keys().map((item, index)=>{
		trimmed = item.split('./')[1]
		let parts = trimmed.split('/')
		parts = parts.map((item)=> item.split('.js')[0].toLowerCase() )
		returned = returned.setIn( parts, fromJS(requireContext(item, index)) )
	});
  return returned
}