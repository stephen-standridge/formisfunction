class CreateMedia < ActiveRecord::Migration[5.0]
  def change
		create_table :media do |t|
	      t.integer :order
	      t.references :mediable, polymorphic: true, index: true
				t.belongs_to :component, index: true	      
	    end
  end
end
