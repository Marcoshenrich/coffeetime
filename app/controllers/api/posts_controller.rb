class Api::PostsController < ApplicationController
   
    def ping
        return {'status': 'good'}
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
            render "api/post/show"
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
        params.require(:post).permit(:title, :rating, :text)
    end

end
