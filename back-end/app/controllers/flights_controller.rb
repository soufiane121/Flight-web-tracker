class FlightsController < ApplicationController

    # def index
    #     airports = Flight.search_by_airport
    #     render json: airports
    # end

    # def index
    #     flights = Flight.search_by_airport(filtered_params)
    #     render json: flights
    # end

    def create 
        flight = Flight.create(filtered_params)
        if flight.save
            message = "You are tracking'#{flight.flight.number}' from airport #{@flight.departureç} was just added."
            TwilioTextMessenger.new(message).call
        end
    end 
    private

    def filtered_params
        params.require(:flight).permit(flight_data)
    end


end
