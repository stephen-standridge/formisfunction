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

# create layouts
layout1 = ViewLayout.create! layout_type: 'rtl'
layout2 = ViewLayout.create! layout_type: 'ltr'
layout3 = SiteLayout.create! layout_type: 'ttb'

site = Site.create! slug: '', 
	lines: Line.where(slug: ['top', 'middle', 'bottom']), 
	links: Link.where(anchor: ['home', 'contact']), 
	layout: layout3

# create component
component1 = Component.create! slug: 'component_1', 
	component_type: '1_by_n_video',
	name: '1 video example'
component2 = Component.create! slug: 'component_2', 
	component_type: 'n_by_1_video',
	name: '2 video example'

component3 = Component.create! slug: 'component_3', 
	component_type: '1_by_n_audio',
	name: '1 audio example'
component4 = Component.create! slug: 'component_4', 
	component_type: 'n_by_1_audio',
	name: '2 audio example'

component5 = Component.create! slug: 'component_5', 
	component_type: '1_by_n_article',
	name: '1 article example'
component6 = Component.create! slug: 'component_6', 
	component_type: 'n_by_1_article',
	name: '2 article example'

# create views
topView1 = View.create! slug: 'top_view_1', 
	title: 'first audio view', 
	line: top, 
	layout: layout1,
	components: Component.where(slug: ['component_1', 'component_2'])
topView2 = View.create! slug: 'top_view_2', 
	title: 'second audio view', 
	line: top, 
	layout: layout1,
	components: Component.where(slug: ['component_2', 'component_3'])

middleView1 = View.create! slug: 'middle_view_1', 
	title: 'first video view', 
	line: middle, 
	layout: layout2,
	components: Component.where(slug: ['component_3', 'component_4', 'component_5'])
middleView2 = View.create! slug: 'middle_view_2', 
	title: 'second video view',
	line: middle, 
 	layout: layout2,
	components: Component.where(slug: ['coponent_5'])


bottomView1 = View.create! slug: 'bottom_view_1', 
	title: 'first article view', 
	line: bottom, 
	layout: layout1,
	components: Component.where(slug: ['component_6', 'component_5'])
bottomView2 = View.create! slug: 'bottom_view_2', 
	title: 'second article view', 
	line: bottom, 
	layout: layout2,
	components: Component.where(slug: ['component_6', 'component_1'])



# create audio/video

audio1 = Audio.create! title: 'space jam', url: 'https://soundcloud.com/mutrix/space-jam-mutrix-tune-squad-remix-1'
audio2 = Audio.create! title: 'octavarium', url: 'https://soundcloud.com/dreamtheater/octavarium'

video1 = Video.create! title: 'chaud lapin', url: 'https://vimeo.com/167414855'
video2 = Video.create! title: 'symphony of the two minds', url: 'https://vimeo.com/168920644'

# create clips/articles

article1 = Article.create! slug: 'lorem_article_1', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n'), 
	order: 0, 
	component: component5
article2 = Article.create! slug: 'lorem_article_2', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n'), 
	order: 0, 
	component: component6
article3 = Article.create! slug: 'lorem_article_3', 
	title: Faker::Lorem.word, 
	body: Faker::Lorem.paragraphs(3).join('/n'), 
	order: 1, 
	component: component6

audioClip1 = AudioClip.create! slug: 'whole_space_jam', 
	audio: audio1,  
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds, 
	order: 0, 
	component: component3
audioClip2 = AudioClip.create! slug: 'octavarium_1', 
	audio: audio2,  
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds, 
	order: 0, 
	component: component4
audioClip3 = AudioClip.create! slug: 'octavarium_2', 
	audio: audio2,  
	start: Time.now + 300.seconds, 
	end: Time.now + 600.seconds, 
	order: 1, 
	component: component4

videoClip1 = VideoClip.create! slug: 'whole_chaud', 
	video: video1,  
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds, 
	order: 0, 
	component: component1
videoClip2 = VideoClip.create! slug: 'symphony_1', 
	video: video2, 
	start: Time.now + 0.seconds, 
	end: Time.now + 300.seconds, 
	order: 0, 
	component: component2
videoClip3 = VideoClip.create! slug: 'symphony_2', 
	video: video2,  
	start: Time.now + 300.seconds, 	
	end: Time.now + 600.seconds, 
	order: 1, 
	component: component2

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')