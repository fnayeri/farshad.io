module Jekyll
    class TagGenerator < Generator
      safe true
  
      def generate(site)
        all_tags = Hash.new(0)
  
        # Collect tags from posts
        site.posts.docs.each do |post|
          post.data['tags']&.each do |tag|
            all_tags[tag] += 1
          end
        end
  
        # Collect tags from pages
        site.pages.each do |page|
          page.data['tags']&.each do |tag|
            all_tags[tag] += 1
          end
        end
  
        # Filter tags with less than 3 occurrences
        filtered_tags = all_tags.select { |tag, count| count >= 3 }
  
        # Save the filtered tags in the site object
        site.config['all_tags'] = filtered_tags.keys
      end
    end
  end
  