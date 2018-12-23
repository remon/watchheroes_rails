class Api::V1::HeroesController < ApplicationController
  def index
    #sleep(10)
    if params[:q].present?
      rego = /.*#{Regexp.quote(params[:q])}.*/i
      @heroes = Hero.where("hero_attributes.name" => rego).page(params[:page]).per(8)
    else
      @heroes = Hero.page(params[:page]).per(8)
    end

    render :json => {heroes: @heroes, current_page: @heroes.current_page, total_pages: @heroes.total_pages}
  end

  def show
    @hero = Hero.find(params[:id])
    render :json => @hero
  end
end
