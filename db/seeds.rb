
home = Link.create! anchor: 'home', url: '/home'
contact = Link.create! anchor: 'contact', url: '/contact'

site = Component.create! slug: 'site', 
	title: 'site',
	component_type: 'line_navigation_site',
	options: { history: true, initial_state: 'middle' }.to_json

line1 = Component.create! slug: 'top',
	title: 'top_line',
	component_type: 'line',
	options: { initial_state: 'top_1' }.to_json	

line2 = Component.create! slug: 'middle',
	title: 'middle_line',
	component_type: 'line',
	options: { initial_state: 'middle_1' }.to_json	

line3 = Component.create! slug: 'bottom',
	title: 'bottom_line',
	component_type: 'line',
	options: { initial_state: 'bottom_1' }.to_json		

Medium.create! collection: 'line_navigation', component: site, mediable: line1
Medium.create! collection: 'line_navigation', component: site, mediable: line2
Medium.create! collection: 'line_navigation', component: site, mediable: line3

Medium.create! collection: 'navigation', order: 0, component: site, mediable: home
Medium.create! collection: 'navigation', order: 1, component: site, mediable: contact


# create clips/articles

article1 = Article.create! slug: 'lorem_article_1', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n')
article2 = Article.create! slug: 'lorem_article_2', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n')
article3 = Article.create! slug: 'lorem_article_3', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n')

audioClip1 = AudioClip.create! slug: 'whole_space_jam', 
	title: 'space jam', url: 'https://soundcloud.com/mutrix/space-jam-mutrix-tune-squad-remix-1', 
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds
audioClip2 = AudioClip.create! slug: 'octavarium_1', 
	title: 'octavarium', url: 'https://soundcloud.com/dreamtheater/octavarium',  
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds
audioClip3 = AudioClip.create! slug: 'octavarium_2', 
	title: 'octavarium', url: 'https://soundcloud.com/dreamtheater/octavarium',
	start: Time.now + 300.seconds, 
	end: Time.now + 600.seconds

videoClip1 = VideoClip.create! slug: 'whole_chaud', 
	title: 'chaud lapin', url: 'https://vimeo.com/167414855',  
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds
videoClip2 = VideoClip.create! slug: 'symphony_1', 
	title: 'symphony of the two minds', url: 'https://vimeo.com/168920644',
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds
videoClip3 = VideoClip.create! slug: 'symphony_2', 
	title: 'symphony of the two minds', url: 'https://vimeo.com/168920644', 
	start: Time.now + 300.seconds, 	
	end: Time.now + 600.seconds

# make site component
# make line navigation component
# create component
middleView1 = Component.create! slug: 'middle_1', 
	component_type: 'one_by_n_video',
	options: { test_option_3: false }.to_json,		
	title: '1 video example'
middleView2 = Component.create! slug: 'middle_2', 
	component_type: 'n_by_one_video',
	options: { test_option_3: true }.to_json,		
	title: '2 video example'

topView1 = Component.create! slug: 'top_1', 
	component_type: 'one_by_n_audio',
	options: { test_option_1: false }.to_json,		
	title: '1 audio example'
topView2 = Component.create! slug: 'top_2', 
	component_type: 'n_by_one_audio',
	options: { test_option_1: true }.to_json,		
	title: '2 audio example'

bottomView1 = Component.create! slug: 'bottom_1', 
	component_type: 'one_by_n_article',
	options: { test_option_2: false }.to_json,		
	title: '1 article example'
bottomView2 = Component.create! slug: 'bottom_2', 
	component_type: 'n_by_one_article',
	options: { test_option_2: true }.to_json,	
	title: '2 article example'


Medium.create! order: 0, component: line1, collection: 'views', mediable: topView1
Medium.create! order: 1, component: line1, collection: 'views', mediable: topView2

Medium.create! order: 0, component: line2, collection: 'views', mediable: middleView1
Medium.create! order: 1, component: line2, collection: 'views', mediable: middleView2

Medium.create! order: 0, component: line3, collection: 'views', mediable: bottomView1
Medium.create! order: 1, component: line3, collection: 'views', mediable: bottomView2

Medium.create! order: 0, component: topView1, mediable: audioClip1
Medium.create! order: 1, component: topView2, mediable: audioClip2
Medium.create! order: 1, component: topView2, mediable: audioClip3

Medium.create! order: 0, component: middleView1, mediable: videoClip1
Medium.create! order: 1, component: middleView2, mediable: videoClip2
Medium.create! order: 1, component: middleView2, mediable: videoClip3

Medium.create! order: 0, component: bottomView1, mediable: article1
Medium.create! order: 1, component: bottomView2, mediable: article2
Medium.create! order: 1, component: bottomView2, mediable: article3

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')