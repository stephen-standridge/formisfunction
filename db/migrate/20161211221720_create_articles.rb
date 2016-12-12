class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
			t.string  :slug, index: true
			t.string  :title
			t.text    :body
			t.integer :order			

			t.belongs_to :component, index: true			
      t.timestamps
    end
  end
end
