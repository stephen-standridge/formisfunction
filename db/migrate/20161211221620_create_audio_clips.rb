class CreateAudioClips < ActiveRecord::Migration[5.0]
  def change
    create_table :audio_clips do |t|
			t.string  :slug, index: true
			t.time    :start
			t.time    :end		

			t.references :audio, index: true
      t.timestamps
    end
  end
end
