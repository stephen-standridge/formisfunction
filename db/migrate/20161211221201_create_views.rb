class CreateViews < ActiveRecord::Migration[5.0]
  def change
    create_table :views do |t|
      t.string :view_type     
      t.json :view_options        
      t.references :line, index: true
      t.string :slug, index: true
      t.string :title

      t.timestamps
    end
 
    create_table :components do |t|
      t.string :slug, index: true    	
      t.string :component_type
      t.json :component_options              
      t.string :name
      t.timestamps
    end
 
    create_table :components_views, id: false do |t|
      t.belongs_to :view, index: true
      t.belongs_to :component, index: true
    end
  end  
end
