class AddLinksAndJoins < ActiveRecord::Migration[5.0]
  def change
  	create_table :links do |t|
			t.string :href,   null: false
      t.string :anchor, null: false
  	end

    create_table :links_sites, id: false do |t|
      t.belongs_to :link, index: true
      t.belongs_to :site, index: true
    end
  end
end
