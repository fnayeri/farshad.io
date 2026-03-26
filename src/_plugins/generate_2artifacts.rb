# frozen_string_literal: true

module Jekyll
  # Attaches page.data['artifacts'] (image and video paths under assets/artifacts/<key>/) for portfolio pages.
  # Collection markdown files have no `name` in front matter (unlike CSV-generated pages), so the
  # artifact folder key defaults to the portfolio file basename (e.g. verizon-tips.md → verizon-tips).
  # Override with front matter: artifacts_key: other-folder-name
  class ArtifactImagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      site.pages.each do |page|
        key = artifact_folder_key(page)
        next if key.nil? || key.empty?

        artifacts_path = File.join('assets', 'artifacts', key)
        artifact_dir = File.join(site.source, artifacts_path)
        next unless Dir.exist?(artifact_dir)

        media = Dir.entries(artifact_dir).select do |f|
          File.file?(File.join(artifact_dir, f)) && f =~ /\.(png|jpe?g|gif|m4v|mp4|webm|mov)$/i
        end.sort

        Jekyll.logger.info "found #{media.length} artifacts: #{media.inspect}" if media.any?
        page.data['artifacts'] = media.map { |f| File.join(artifacts_path, f) }
      end
    end

    def artifact_folder_key(page)
      override = page.data['artifacts_key'] || page.data['artifact_key']
      o = override.to_s.strip
      return o unless o.empty?

      n = page.data['name'].to_s.strip
      return n unless n.empty?

      if page.respond_to?(:basename_without_ext)
        b = page.basename_without_ext.to_s.strip
        return b unless b.empty?
      end

      return unless page.respond_to?(:path) && page.path

      File.basename(page.path, File.extname(page.path))
    end
  end
end
