class AddLinksAndJoins < ActiveRecord::Migration[5.0]
  def change
  	create_table :links do |t|
			t.string :anchor,   null: false
      t.string :url, null: false
  	end
  end
end
