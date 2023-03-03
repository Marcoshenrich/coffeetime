class Api::CoffeesController < ApplicationController
   
    def ping
        return {'status': 'good'}
    end

    def index
        @coffees = Coffee.all
        render "api/coffees/index"
    end

    def show
    end

    def create
    end

    def destroy
    end

end
