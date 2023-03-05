class Api::CoffeesController < ApplicationController
   
    def ping
        # return {'status': 'good'}
    end

    def index
        @coffees = Coffee.all
        render "api/coffees/index"
    end

    def show
        @coffee = Coffee.find_by_id(params[:id])
        render "api/coffees/show"
    end

    def create
        @coffee = Coffee.new(coffee_params)

        if @coffee.save
            render "api/coffees/show"
        else
            render json: { errors: @coffee.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def destroy
        @coffee = Coffee.find_by_id(params[:id])
        @coffee.destroy
        head :no_content
    end

    private
    def coffee_params
        params.require(:coffee).permit(:name, :year, :caffeine_content)
    end

end
