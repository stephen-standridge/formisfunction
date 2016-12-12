class CreateAudioClips < ActiveRecord::Migration[5.0]
  def change
    create_table :audio_clips do |t|
			t.string  :slug, index: true
			t.integer :order
			t.time    :start
			t.time    :end		

			t.belongs_to :component, index: true
			t.references :audio, index: true
      t.timestamps
    end
  end
end
