module Jekyll
    class PortfolioPageGenerator < Generator
      safe true
  
      def generate(site)
        data_spec = site.config['data_pages'].find { |spec| spec['dataset'] == 'portfolio' }
        return unless data_spec
  
        site.data['portfolio'].each do |item|
            Jekyll.logger.info "\nnil check: #{item['name']} - #{item['name'].nil?}"
            next if item['name'].nil? || item['name'].strip.empty? # Skip if title is nil or blank
            site.pages << PortfolioPage.new(site, site.source, item, data_spec)
        end
      end
    end
  
    class PortfolioPage < Page
      def initialize(site, base, item, data_spec)


        @site = site
        @base = base
        @name = item['name']
        @root = data_spec['root'] || '/'

        Jekyll.logger.info "\npage input: #{@root} - #{@name}", item

        @dir  = File.join(@root, item['name'])
        logo = File.join(data_spec['logo_dir'], @name + ".png") if data_spec['logo_dir'] and @name
        item['image'] = logo if logo
        item['images'] = [logo] if logo
        item['permalink'] = File.join(@root,@name)

        self.process(@name + '.html')
        self.read_yaml(File.join(base, '_layouts'), 'portfolio.html')
        self.data.merge!(item)

        Jekyll.logger.info "\nGenerating portfolio page: #{@dir}, #{@name}", self.data
    end
  end
end