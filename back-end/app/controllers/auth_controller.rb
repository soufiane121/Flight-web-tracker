require "byebug"
class AuthController < ApplicationController

    def login
        user = User.find_by(user_name: params[:user_name], password_digest: params[:password_digest])
        # debugger

        if user
            token = encode_token(user.id)
            render json: {user: user, token: token}
        else
            render json: {errors: "Username or password incorrect."}
        end
    end

    def auto_login 
        # debugger
        if session_user
            render json: {user: session_user}
        else
            render json: {errors: "User not found. Please login again. "}
        end
    end

end
