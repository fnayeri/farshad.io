module Jekyll
    class PortfolioPageGenerator < Generator
      safe true
  
      def generate(site)
        data_spec = site.config['data_pages'].find { |spec| spec['dataset'] == 'portfolio' }
        return unless data_spec
  
        site.data['portfolio'].each do |item|
          next if item['title'].nil? || item['title'].strip.empty? # Skip if title is nil or blank
          site.pages << PortfolioPage.new(site, site.source, item, data_spec)
        end
      end
    end
  
    class PortfolioPage < Page
      def initialize(site, base, item, data_spec)
        @site = site
        @base = base
        @dir  = item['permalink'] || data_spec['data'] # Use 'permalink' or fallback to 'data'
        @name = item['permalink'] + '.html'

        images = [File.join(data_spec['logo_dir'], item['logo'] + ".png")] if data_spec['logo_dir'] and item['logo']

        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'portfolio.html')
        self.data.merge!(item)
        self.data['images'] = images
        self.data['image'] = images.first

        Jekyll.logger.info "\nGenerating portfolio page: #{@dir}, #{@name}", self.data
  
    end
    end
  end
