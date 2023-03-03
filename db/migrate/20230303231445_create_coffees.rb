class CreateCoffees < ActiveRecord::Migration[7.0]
  def change
    create_table :coffees do |t|
      t.string :name, null: false
      t.integer :year, null: false
      t.float :caffeine_content, null: false
      t.float :caffeine_percentage, null: false
      t.timestamps
    end
  end
end
