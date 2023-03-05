json.post do
    json.extract! @post, :id, :coffee_id, :text, :title, :rating
end