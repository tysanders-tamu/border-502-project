class CreateInterests < ActiveRecord::Migration[7.2]
  def change
    create_table :interests do |t|
      t.string :interest_type
      t.string :name

      t.timestamps
    end
  end
end
