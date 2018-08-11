json.array! @new_messages.each do |message|
  json.id  message.id
  json.content  message.content
  json.user_name  message.user.name
  json.created_at  message.created_at.to_s(:datetime)
  json.image  message.image.url
end
