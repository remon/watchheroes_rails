records = JSON.parse(File.read("#{Rails.root}/lib/data.json"))
records.each do |record|
  hero = Hero.new(id: record["id"])
  hero.type = record["type"]
  hero.links = record["links"]

  hero.hero_attributes = record["attributes"]

  hero.relationships = record["relationships"]
  hero.save!
end
