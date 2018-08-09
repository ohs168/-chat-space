json.array! @users.each do |user|
  json.name  user.name
  json.id  user.id
end
