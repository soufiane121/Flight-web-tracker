class FlightsController < ApplicationController

    # def index
    #     airports = Flight.search_by_airport
    #     render json: airports
    # end

    def index
        flights = Flight.all
        render json: flights
    end
end
