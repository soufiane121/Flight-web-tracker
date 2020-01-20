class FlightsController < ApplicationController

    # def index
    #     airports = Flight.search_by_airport
    #     render json: airports
    # end

    def index
        flights = Flight.search_by_airport(filtered_params)
        render json: flights
    end

    private

    def filtered_params
        params.require(:flight).permit(airportcode, dep_or_arri)
    end


end
