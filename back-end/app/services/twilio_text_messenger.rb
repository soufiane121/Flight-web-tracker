class TwilioTextMessenger
    attr_reader :message
  
    def initialize(message)
      @message = message
    end
  
    def call
      client = Twilio::REST::Client.new
      client.messages.create({
        from: Rails.application.secrets.twilio_phone_number,
        to: 'YOUR PERSONAL PHONE NUMBER GOES HERE',
        body: message
      })
    end
  end