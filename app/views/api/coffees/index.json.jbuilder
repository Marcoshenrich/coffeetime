@coffees.each do |coffee|
    json.set! coffee.id do
          json.extract! coffee, :id, :name, :year, :caffeine_content, :caffeine_percentage
    end
end
