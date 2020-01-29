require 'byebug'
require 'rest-client'
require 'nokogiri'
require 'open-uri'
class Flight < ApplicationRecord
    belongs_to :user
    validates :airline, presence: true
    validates :arrival, presence: true
    validates :departure, presence: true
    validates :flightt, presence: true
    validates :status, presence: true
    # validates :typpe, presence: true
    

    # def self.search_by_airport(airportcode, dep_or_arri)
    #     url = "http://aviation-edge.com/v2/public/timetable?key=ae4475-a2c502&iataCode=#{airportcode}&type=#{dep_or_arri}"
    #     respond = RestClient.get(url)
    #     full_hash = JSON.parse(respond)
    #     full_hash
    # end

    # def self.search_by_flight(*arg_for_flight_number)
    #     url = "http://aviation-edge.com/v2/public/flights?key=ae4475-a2c502&flightIata=UA2326"
    #     respond = RestClient.get(url)
    #     full_hash = JSON.parse(respond)
    #     full_hash
    # end

    # # below should have argument

    # def self.scrap
    #     html = open("https://www.google.com/search?q=UA2326&rlz=1C1CHBF_enUS742US754&oq=UA2326&aqs=chrome..69i57j69i59j69i60.650j0j7&sourceid=chrome&ie=UTF-8")
    #     doc = Nokogiri::HTML.parse(html)
    #     teext = doc.css("vk_h.fg9g5e")
    #     puts teext

    # end
end
