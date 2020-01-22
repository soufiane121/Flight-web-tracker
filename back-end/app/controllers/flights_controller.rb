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
        @flight = Flight.create(filtered_params)
        puts @flight
        if @flight.valid?
            # message = "You are tracking'#{@flight.flight.number}' from airport #{@flight.departure} was just added."
            message = "Welcome, you fligh added successfully, We will keep you posted on any further update"
            TwilioTextMessenger.new(message).call
            render json: {error: @fligh.errors.full_messages}, status: :created
        else
            render json: {error: @flight.errors.full_messages} , status: :not_created
        end
    end 

    private

    def filtered_params
        params.require(:flight).permit(:flight_data, :user_id)
    end


end
