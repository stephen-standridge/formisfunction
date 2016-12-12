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

# create layouts
videoLayout1 = Layout.create! slug: '1_by_n_video'
videoLayout2 = Layout.create! slug: 'n_by_1_video'

audioLayout1 = Layout.create! slug: '1_by_n_audio'
audioLayout2 = Layout.create! slug: 'n_by_1_audio'

articleLayout1 = Layout.create! slug: '1_by_n_article'
articleLayout2 = Layout.create! slug: 'n_by_1_article'

# create views
topView1 = View.create! slug: 'top_view_1', title: 'first audio view', line: top, layout: audioLayout1
topView2 = View.create! slug: 'top_view_2', title: 'second audio view', line: top, layout: audioLayout2

middleView1 = View.create! slug: 'middle_view_1', title: 'first video view', line: middle, layout: videoLayout1
middleView2 = View.create! slug: 'middle_view_2', title: 'second video view', line: middle, layout: videoLayout2

bottomView1 = View.create! slug: 'bottom_view_1', title: 'first article view', line: bottom, layout: articleLayout1
bottomView2 = View.create! slug: 'bottom_view_2', title: 'second article view', line: bottom, layout: articleLayout2

# create audio/video

audio1 = Audio.create! title: 'space jam', url: 'https://soundcloud.com/mutrix/space-jam-mutrix-tune-squad-remix-1'
audio2 = Audio.create! title: 'octavarium', url: 'https://soundcloud.com/dreamtheater/octavarium'

video1 = Video.create! title: 'chaud lapin', url: 'https://vimeo.com/167414855'
video2 = Video.create! title: 'symphony of the two minds', url: 'https://vimeo.com/168920644'

# create clips/articles

article1 = Article.create! slug: 'lorem_article_1', view: bottomView1, title: Faker::Lorem.word, body: Faker::Lorem.paragraphs(3).join('/n'), order: 0
article2 = Article.create! slug: 'lorem_article_2', view: bottomView2, title: Faker::Lorem.word, body: Faker::Lorem.paragraphs(3).join('/n'), order: 0
article3 = Article.create! slug: 'lorem_article_3', view: bottomView2, title: Faker::Lorem.word, body: Faker::Lorem.paragraphs(3).join('/n'), order: 1

audioClip1 = AudioClip.create! slug: 'whole_space_jam', audio: audio1, view: topView1, start: Time.now + 0.seconds, end: Time.now + 300.seconds, order: 0
audioClip2 = AudioClip.create! slug: 'octavarium_1', audio: audio2, view: topView2, start: Time.now + 0.seconds, end: Time.now + 300.seconds, order: 0
audioClip3 = AudioClip.create! slug: 'octavarium_2', audio: audio2, view: topView2, start: Time.now + 300.seconds, end: Time.now + 600.seconds, order: 1

videoClip1 = VideoClip.create! slug: 'whole_chaud', video: video1, view: middleView1, start: Time.now + 0.seconds, end: Time.now + 300.seconds, order: 0
videoClip2 = VideoClip.create! slug: 'symphony_1', video: video2, view: middleView2, start: Time.now + 0.seconds, end: Time.now + 300.seconds, order: 0
videoClip3 = VideoClip.create! slug: 'symphony_2', video: video2, view: middleView2, start: Time.now + 300.seconds, end: Time.now + 600.seconds, order: 1

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')