class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.integer :user_id
      t.jsonb :airline, default: '{}'
      t.jsonb :arrival, default: '{}'
      t.jsonb :departure, default: '{}'
      t.jsonb :flightt, default: '{}'
      t.string :status, 
      # t.string :typpe,

      t.timestamps
    end
  end
end
