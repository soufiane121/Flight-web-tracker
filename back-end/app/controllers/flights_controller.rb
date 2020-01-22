class FlightsController < ApplicationController


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
