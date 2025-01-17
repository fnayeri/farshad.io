
module Jekyll
    class PortfolioPageGenerator < Generator
      safe true
      Jekyll.logger.info "starting artifact generator"
  
      def generate(site)
        data_spec = site.config['data_pages'].find { |spec| spec['dataset'] == 'portfolio' }
        return unless data_spec
  
        site.data['portfolio'].each do |item|
            next if item['name'].nil? || item['name'].strip.empty? # Skip if title is nil or blank
            next if item['name'].strip.start_with?('#') # Skip if title starts with #

            Jekyll.logger.info "generating #{item['name']}"

            site.pages << PortfolioPage.new(site, site.source, item, data_spec)
        end
      end
    end
  
    class PortfolioPage < Page
      def initialize(site, base, item, data_spec)


        @site = site
        @base = base
        @name = item['name'].strip.downcase
        @root = data_spec['root'] || '/'

        @dir  = File.join(@root, item['name'])
        logo = File.join(data_spec['logo_dir'], @name + ".png") if data_spec['logo_dir'] and @name
        item['image'] = logo || @name
        item['images'] = [item['image']]

        # Jekyll.logger.info "\n LOGO #{@name}, #{logo} #{item['image']}, #{item['images']}, #{item}"

        item['permalink'] = File.join(@root,@name)
        item['tags'] = item['tags'].split(',').map(&:strip) if item['tags']
        Jekyll.logger.info "tags: #{item['tags']}"
        item['enabled'] = true

        self.process(@name + '.html')
        self.read_yaml(File.join(base, '_layouts'), 'portfolio.html')
        self.data.merge!(item)

        # Jekyll.logger.debug "\nGenerating portfolio page: #{@dir}, #{@name}", self.data
    end
  end
end