require "byebug"
class FlightsController < ApplicationController

    # before_action :filtered_params

    def index
        @flights = Flight.all
        render json: @flights, status: 200
    end

    def new
        @flight =Flight.find_by_id(params[:id])
        render json: @flight, status: :found
    end

    def show
        @flight = Flight.find_by_id(params[:id])
        render json: @flight
    end

    def update
        @flight = Flight.find_by_id(params[:id])
        @flight.update(status: params[:status])
        
        if @flight.status == "landed"
        message = "Your flight has been LANDED successfully from #{@flight.departure["iataCode"]} " 
        else
        message = "Your flight status now is #{@flight.status} from airport #{@flight.departure["iataCode"]}." 
        end
        # TwilioTextMessenger.new(message).call
        render json: @flight
    end

    def create 
        @flight = Flight.create(filtered_params)
        puts @flight
        if @flight.valid?
            message = "You are tracking '#{@flight.flightt['iataNumber']}' from airport #{@flight.departure["iataCode"]} was just added.We will keep you posted on any further update"
            # message = "Welcome, you fligh added successfully, We will keep you posted on any further update"
            TwilioTextMessenger.new(message).call
            render json: { flight: UserSerializer.new(@flight) }, status: :created
        else
            render json: {error: @flight.errors.full_messages} , status: :not_created
        end
    end 

    private

    def filtered_params
        params.require(:flight).permit!
        # (:user_id, :status, :phone_number, :typpe, :id, flight_attributes: [:airline, :departure, :arrival, :flightt])
        # debugger
    end

end
