require 'set'

module Jekyll
  class PortfolioPageGenerator < Generator
    safe true
    Jekyll.logger.info "starting artifact generator"

    def generate(site)
      data_spec = site.config['data_pages'].find { |spec| spec['dataset'] == 'portfolio' }
      return unless data_spec

      Jekyll.logger.info "Found data_spec: #{data_spec}"
      Jekyll.logger.info "Portfolio data count: #{site.data['portfolio'].length}"

      portfolio_items = site.data['portfolio'].select do |item|
        name = item['name'].to_s.strip
        !name.empty? && !name.start_with?('#')
      end

      slugs = portfolio_items.map { |item| PortfolioPage.effective_slug(item) }
      slug_set = slugs.to_set

      prefix_to_full_slugs = Hash.new { |h, k| h[k] = [] }
      slugs.each do |slug|
        next unless slug.include?('-')

        prefix = slug.split('-', 2).first
        prefix_to_full_slugs[prefix] << slug
      end

      portfolio_items.each do |item|
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

      prefix_to_full_slugs.each do |prefix, full_slugs|
        next unless full_slugs.size == 1
        next if slug_set.include?(prefix)

        full = full_slugs.first
        redirect = PortfolioAliasRedirectPage.new(site, site.source, prefix, "/#{full}/")
        site.pages << redirect
        Jekyll.logger.info "Created slug alias redirect: /#{prefix}/ → /#{full}/"
      end

      Jekyll.logger.info "Total pages after portfolio generation: #{site.pages.length}"
    end
  end

  class PortfolioPage < Page
    def self.effective_slug(item)
      name = item['name'].to_s.strip.downcase
      slug_field = item['slug'].to_s.strip
      url_slug = slug_field.empty? ? name : slug_field.downcase
      url_slug.gsub(%r{[^a-z0-9-]}, '')
    end

    def initialize(site, base, item, data_spec)
      @site = site
      @base = base
      @name = item['name'].strip.downcase

      legacy_permalink = item['permalink'].to_s.strip
      url_slug = self.class.effective_slug(item)

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

  # Short first-segment alias: /cme/ → /cme-chat/ when prefix is unique among portfolio slugs
  class PortfolioAliasRedirectPage < Page
    def initialize(site, base, alias_segment, target_path)
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
        'permalink' => "/#{alias_segment}/"
      }
      self.content = ''

      Jekyll.logger.info "Slug alias redirect url: #{self.url}"
    end
  end
end
