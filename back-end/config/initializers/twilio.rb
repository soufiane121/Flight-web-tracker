Twilio.configure do |config|
    config.account_sid = Tracker::Application.credentials.twilio_account_sid
    config.auth_token = Tracker::Application.credentials.twilio_auth_token
  end