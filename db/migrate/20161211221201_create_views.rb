class CreateViews < ActiveRecord::Migration[5.0]
  def change
    create_table :views do |t|
      t.string :layout_type     
      t.json :layout_options        
      t.references :line, index: true
      t.string :slug, index: true
      t.string :title

      t.timestamps
    end
 
    create_table :components do |t|
      t.string :slug, index: true    	
      t.string :component_type
      t.string :name
      t.timestamps
    end
 
    create_table :components_views, id: false do |t|
      t.belongs_to :view, index: true
      t.belongs_to :component, index: true
    end
  end  
end
