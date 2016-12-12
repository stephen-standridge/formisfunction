class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.string :slug, index: true
      t.string :type

      t.timestamps
    end
  end
end
