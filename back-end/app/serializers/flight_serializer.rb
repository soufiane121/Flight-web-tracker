class FlightSerializer < ActiveModel::Serializer
  attributes :id, :airline, :arrival, :departure, :flightt, :status
  belongs_to :user

end
