class Api::PostsController < ApplicationController
       wrap_parameters include: Post.attribute_names + ['coffeeId']

    def ping
        render "api/ping"
    end

    def index
        @posts = Post.all
        render "api/posts/index"
    end

    def show
        @posts = Post.find_by_id(params[:id])
        render "api/posts/show"
    end

    def create
        @post = Post.new(post_params)

        if @post.save
            render "api/posts/show"
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def destroy
        @post = Post.find_by_id(params[:id])
        @post.destroy
        head :no_content
    end

    private
    def post_params
        params.require(:post).permit(:title, :coffee_id, :rating, :text)
    end

end
