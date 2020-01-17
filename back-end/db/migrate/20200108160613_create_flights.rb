class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.integer :user_id
      t.jsonb :flight_data, default: '{}'
      t.timestamps
    end
  end
end
