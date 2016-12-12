class CreateVideoClips < ActiveRecord::Migration[5.0]
  def change
    create_table :video_clips do |t|
			t.string  :slug, index: true
			t.integer :order
			t.time    :start
			t.time    :end	
					
			t.belongs_to :component, index: true			
			t.references :video, index: true
      t.timestamps
    end
  end
end
