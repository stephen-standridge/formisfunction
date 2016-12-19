class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.string :slug, index: true
      t.string :line_type

      t.timestamps
    end

    create_table :sites do |t|
    	t.string :slug, index: true
      t.timestamps
    end    

    create_table :lines_sites, id: false do |t|
      t.belongs_to :line, index: true
      t.belongs_to :site, index: true
    end    

  end
end
