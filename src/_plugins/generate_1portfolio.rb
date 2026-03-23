
module Jekyll
  class PortfolioPageGenerator < Generator
    safe true
    Jekyll.logger.info "starting artifact generator"

    def generate(site)
      data_spec = site.config['data_pages'].find { |spec| spec['dataset'] == 'portfolio' }
      return unless data_spec

      Jekyll.logger.info "Found data_spec: #{data_spec}"
      Jekyll.logger.info "Portfolio data count: #{site.data['portfolio'].length}"

      site.data['portfolio'].each do |item|
        next if item['name'].nil? || item['name'].strip.empty?
        next if item['name'].strip.start_with?('#')

        Jekyll.logger.info "generating #{item['name']}"

        page = PortfolioPage.new(site, site.source, item, data_spec)
        Jekyll.logger.info "Created page: #{page.url}"
        site.pages << page

        legacy = item['legacy_permalink'].to_s.strip
        target = item['permalink'].to_s
        unless legacy.empty? || target.empty?
          redirect = PortfolioLegacyRedirectPage.new(site, site.source, legacy, target)
          site.pages << redirect
          Jekyll.logger.info "Created legacy redirect: /p/#{legacy}/ → #{target}"
        end
        item.delete('legacy_permalink')
      end

      Jekyll.logger.info "Total pages after portfolio generation: #{site.pages.length}"
    end
  end

  class PortfolioPage < Page
    def initialize(site, base, item, data_spec)
      @site = site
      @base = base
      @name = item['name'].strip.downcase

      legacy_permalink = item['permalink'].to_s.strip
      slug_field = item['slug'].to_s.strip
      url_slug = slug_field.empty? ? @name : slug_field.downcase
      url_slug = url_slug.gsub(%r{[^a-z0-9-]}, '')

      item['legacy_permalink'] = legacy_permalink
      item['permalink'] = "/#{url_slug}/"
      item['image'] = File.join(data_spec['logo_dir'], @name + '.png') if data_spec['logo_dir'] && @name
      item['image'] ||= @name
      item['images'] = [item['image']]

      item['tags'] = item['tags'].split(',').map(&:strip) if item['tags']
      Jekyll.logger.info "tags: #{item['tags']}"
      item['enabled'] = true

      self.process('index.html')

      self.data = item
      self.data['layout'] = 'portfolio'

      self.content = ""

      Jekyll.logger.info "Generated portfolio page: #{item['permalink']}, #{@name}, url: #{self.url}"
    end
  end

  # HTML redirect from old /p/<long-permalink>/ to new /<slug>/
  class PortfolioLegacyRedirectPage < Page
    def initialize(site, base, legacy_segment, target_path)
      @site = site
      @base = base
      @name = 'index.html'
      self.process(@name)

      target = target_path.to_s
      target = "/#{target}" unless target.start_with?('/')
      target = "#{target}/" unless target.end_with?('/')

      self.data = {
        'layout' => 'redirect',
        'redirect_to' => target,
        'permalink' => "/p/#{legacy_segment}/"
      }
      self.content = ''

      Jekyll.logger.info "Legacy redirect url: #{self.url}"
    end
  end
end
