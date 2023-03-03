ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Coffee.destroy_all
  Post.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('coffees')
  ApplicationRecord.connection.reset_pk_sequence!('posts')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

    10.times do 
    Coffee.create!({
      name: Faker::Coffee.unique.blend_name,
      year: rand(1900...2023),
      caffeine_content: rand(10...100),
      caffeine_percentage: rand(1...10)
    }) 
  end

  puts "Done!"
end



  # create_table "coffees", force: :cascade do |t|
  #   t.string "name", null: false
  #   t.integer "year", null: false
  #   t.float "caffeine_content", null: false
  #   t.float "caffeine_percentage", null: false
  #   t.datetime "created_at", null: false
  #   t.datetime "updated_at", null: false
  # end

  # create_table "posts", force: :cascade do |t|
  #   t.string "title", null: false
  #   t.bigint "coffee_id", null: false
  #   t.text "text", null: false
  #   t.float "rating", null: false
  #   t.datetime "created_at", null: false
  #   t.datetime "updated_at", null: false
  #   t.index ["coffee_id"], name: "index_posts_on_coffee_id"
  # end
