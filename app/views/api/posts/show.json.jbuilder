json.post do
    json.extract! @post, :id, :coffee_id, :text, :title, :rating
        json.set! :coffee do
            json.extract! @post.coffee, :name, :caffeine_content
        end
end