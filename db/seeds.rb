# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# create lines
top = Line.create! slug: 'top'
middle = Line.create! slug: 'middle'
bottom = Line.create! slug: 'bottom'

home = Link.create! anchor: 'home', href: '/home'
contact = Link.create! anchor: 'contact', href: '/contact'

site = Site.create! slug: '', 
	lines: Line.where(slug: ['top', 'middle', 'bottom']), 
	links: Link.where(anchor: ['home', 'contact']), 
	site_type: 'left_to_right',
	site_options: { test_option_1: true, initial_line_selected: 1 }.to_json


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

# create component
component1 = Component.create! slug: 'component_1', 
	component_type: 'one_by_n_video',
	component_options: { test_option_3: false }.to_json,		
	name: '1 video example'
component2 = Component.create! slug: 'component_2', 
	component_type: 'n_by_one_video',
	component_options: { test_option_3: true }.to_json,		
	name: '2 video example'

component3 = Component.create! slug: 'component_3', 
	component_type: 'one_by_n_audio',
	component_options: { test_option_1: false }.to_json,		
	name: '1 audio example'
component4 = Component.create! slug: 'component_4', 
	component_type: 'n_by_one_audio',
	component_options: { test_option_1: true }.to_json,		
	name: '2 audio example'

component5 = Component.create! slug: 'component_5', 
	component_type: 'one_by_n_article',
	component_options: { test_option_2: false }.to_json,		
	name: '1 article example'
component6 = Component.create! slug: 'component_6', 
	component_type: 'n_by_one_article',
	component_options: { test_option_2: true }.to_json,	
	name: '2 article example'

Medium.create! order: 0, component: component1, mediable: videoClip1
Medium.create! order: 0, component: component2, mediable: videoClip2
Medium.create! order: 1, component: component2, mediable: videoClip3

Medium.create! order: 0, component: component3, mediable: audioClip1
Medium.create! order: 0, component: component4, mediable: audioClip2
Medium.create! order: 1, component: component4, mediable: audioClip3

Medium.create! order: 0, component: component5, mediable: article1
Medium.create! order: 0, component: component6, mediable: article2
Medium.create! order: 1, component: component6, mediable: article3

# create views
topView1 = View.create! slug: 'top_view_1', 
	title: 'first audio view', 
	line: top, 
	view_type: 'top_to_bottom',
	view_options: { test_option_1: false }.to_json,
	components: Component.where(slug: ['component_3'])
topView2 = View.create! slug: 'top_view_2', 
	title: 'second audio view', 
	line: top, 
	view_type: 'front_to_back',
	view_options: { test_option_2: true }.to_json,
	components: Component.where(slug: ['component_4'])

middleView1 = View.create! slug: 'middle_view_1', 
	title: 'first video view', 
	line: middle, 
	view_type: 'front_to_back',
	view_options: { test_option_2: false }.to_json,
	components: Component.where(slug: ['component_1'])
middleView2 = View.create! slug: 'middle_view_2', 
	title: 'second video view',
	line: middle, 
	view_type: 'top_to_bottom',
	view_options: { test_option_3: true }.to_json,
	components: Component.where(slug: ['coponent_2'])


bottomView1 = View.create! slug: 'bottom_view_1', 
	title: 'first article view', 
	line: bottom, 
	view_type: 'top_to_bottom',
	view_options: { test_option_3: false }.to_json,
	components: Component.where(slug: ['component_5'])
bottomView2 = View.create! slug: 'bottom_view_2', 
	title: 'second article view', 
	line: bottom, 
	view_type: 'left_to_right',
	view_options: { test_option_3: false }.to_json,
	components: Component.where(slug: ['component_6'])

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')