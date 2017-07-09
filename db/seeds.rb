# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

u1 = User.create name:"admin", email:"admin@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100", is_admin:true

u2 = User.create name:"robotpanda", email:"robotpanda@gmail.com", password:"chicken", avatar:"https://fillmurray.com/100/100"

Post.destroy_all

p1 = Post.create image:"https://fillmurray.com/200/200"
p2 = Post.create image:"https://fillmurray.com/200/300"

u1.posts << p1
u2.posts << p2

Comment.destroy_all

c1 = Comment.create name:"admin", avatar:"https://fillmurray.com/100/100", context:"I love this site!"
c2 = Comment.create name:"robotpanda", avatar:"https://fillmurray.com/100/100", context:"Absolutely fantastic!!"

u1.comments << c1
p1.comments << c1

u2.comments << c2
p2.comments << c2
