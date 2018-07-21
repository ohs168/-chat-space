## DB設計

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|

#### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages


### messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group


### membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group
