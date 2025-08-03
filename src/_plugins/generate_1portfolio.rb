
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
            next if item['name'].nil? || item['name'].strip.empty? # Skip if title is nil or blank
            next if item['name'].strip.start_with?('#') # Skip if title starts with #

            Jekyll.logger.info "generating #{item['name']}"

            page = PortfolioPage.new(site, site.source, item, data_spec)
            Jekyll.logger.info "Created page: #{page.url}"
            site.pages << page
        end
        
        Jekyll.logger.info "Total pages after portfolio generation: #{site.pages.length}"
    end
  end
  
    class PortfolioPage < Page
      def initialize(site, base, item, data_spec)
        @site = site
        @base = base
        @name = item['name'].strip.downcase
        @root = data_spec['root'] || '/'

        # Use the permalink from CSV data if available, otherwise use the name
        permalink = item['permalink'] || @name
        @dir = File.join(@root, permalink)
        
        logo = File.join(data_spec['logo_dir'], @name + ".png") if data_spec['logo_dir'] and @name
        item['image'] = logo || @name
        item['images'] = [item['image']]

        # Set the permalink to match the directory structure
        item['permalink'] = File.join(@root, permalink)
        item['tags'] = item['tags'].split(',').map(&:strip) if item['tags']
        Jekyll.logger.info "tags: #{item['tags']}"
        item['enabled'] = true

        # Process as index.html to create directory structure
        self.process('index.html')
        
        # Set the layout and content
        self.data = item
        self.data['layout'] = 'portfolio'
        
        # Create empty content since we're generating from data
        self.content = ""

        Jekyll.logger.info "Generated portfolio page: #{@dir}, #{@name}, url: #{self.url}"
    end
  end
end