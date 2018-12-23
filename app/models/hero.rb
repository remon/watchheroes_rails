class Hero
  include Mongoid::Document
  field :_id, type: String, default: -> { id }
  field :type, type: String
  field :links, type: Hash

  field :hero_attributes, type: Hash
  field :relationships, type: Hash
end
