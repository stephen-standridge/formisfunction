json.extract! medium, :slug 
json.id medium.mediable_id
if medium.mediable_type == 'Article'	
	json.extract! medium, :title, :body
end
if medium.mediable_type == 'VideoClip'
	json.extract! medium, :start, :end
	json.extract! medium.video, :url, :title
end
if medium.mediable_type == 'AudioClip'
	json.extract! medium, :start, :end
	json.extract! medium.audio, :url, :title
end

