module Jekyll
    class ArtifactImagesGenerator < Generator
      safe true
  
      def generate(site)
        site.pages.each do |page|
          if page.data['name']
            # Jekyll.logger.info "looking for artifacts for #{page.data['name']}"
            artifacts_path = File.join('assets', 'artifacts', page.data['name'])
            artifact_dir = File.join(site.source, artifacts_path);
            if Dir.exist?(artifact_dir)
              # Jekyll.logger.info "directory exists: #{artifact_dir}"
              images = Dir.entries(artifact_dir).select { |f| File.file?(File.join(artifact_dir, f)) && f =~ /\.(png|jpe?g|gif)$/i }.sort
              Jekyll.logger.info "found #{images.length} images: #{images}"
              page.data['artifacts'] = images.map { |img| File.join(artifacts_path, img) }
            end
          end
        end
      end
    end
  end