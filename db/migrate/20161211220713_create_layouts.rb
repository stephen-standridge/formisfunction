class CreateLayouts < ActiveRecord::Migration[5.0]
	def self.up
		create_table :site_layouts do |t|   	
    	t.string :slug, index: true
    	t.string :layout_type    	
      t.references :site

      t.timestamps
    end

    create_table :view_layouts do |t|     
      t.string :slug, index: true
      t.string :layout_type     
      t.references :view

      t.timestamps
    end    
	end

  def self.down
    drop_table :site_layouts
  	drop_table :view_layouts
  end
end
