class CreateViews < ActiveRecord::Migration[5.0]
  def change
    create_table :views do |t|
      t.string :slug, index: true
      t.string :title

      t.references :line, index: true
    	t.references :layout, index: true

      t.timestamps
    end
  end
end
