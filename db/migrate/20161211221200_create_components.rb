class CreateComponents < ActiveRecord::Migration[5.0]
  def change
    create_table :components do |t|
      t.string :slug, index: true    	
      t.string :component_type
      t.json :component_options              
      t.string :title
      t.timestamps
    end
  end  
end
