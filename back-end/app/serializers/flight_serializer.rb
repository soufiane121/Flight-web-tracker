class FlightSerializer < ActiveModel::Serializer
  attributes :flight_data
  belongs_to :user

end
