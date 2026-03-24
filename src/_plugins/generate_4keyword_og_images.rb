# frozen_string_literal: true

require 'cgi'
require 'fileutils'
require 'tmpdir'

module Jekyll
  # Renders Open Graph PNGs (1200×630) for each portfolio row: light gray circle with
  # assets/about/fn.png clipped to the circle, then FARSHAD NAYERI + customer/title in bold caps.
  # Requires rsvg-convert (librsvg) or ImageMagick on PATH.
  class KeywordOgImagesGenerator < Generator
    safe true
    priority :low

    WIDTH = 1200
    HEIGHT = 630
    OUT_REL = File.join('assets', 'og', 'keywords')
    AVATAR_NAME = 'avatar.png'

    def generate(site)
      portfolio = site.data['portfolio'] || []
      out_dir = File.join(site.dest, OUT_REL)
      FileUtils.mkdir_p(out_dir)

      cmd = raster_backend
      if cmd == :none
        Jekyll.logger.warn 'KeywordOgImages:',
                           'rsvg-convert/magick/convert not found; install librsvg or ImageMagick. Skipping OG PNGs.'
        return
      end

      fn_src = File.join(site.source, 'assets', 'about', 'fn.png')
      unless File.file?(fn_src)
        Jekyll.logger.warn 'KeywordOgImages:', 'assets/about/fn.png not found; skipping OG PNGs.'
        return
      end

      portfolio.each do |row|
        name = row['name'].to_s.strip
        next if name.empty? || name.start_with?('#')
        next unless name.match?(/\A[a-z0-9-]+\z/)

        line2 = line2_text(row)
        out_path = File.join(out_dir, "#{name}.png")

        next unless render_png(cmd, line2, out_path, fn_src)

        Jekyll.logger.info 'KeywordOgImages:', "Wrote #{File.join('/', OUT_REL, "#{name}.png")}"
      end
    end

    private

    def raster_backend
      return @raster_backend if defined?(@raster_backend)

      null = File::NULL
      @raster_backend = if system('command', '-v', 'rsvg-convert', out: null, err: null)
                          :rsvg
                        elsif system('command', '-v', 'magick', out: null, err: null)
                          :magick
                        elsif system('command', '-v', 'convert', out: null, err: null)
                          :convert
                        else
                          :none
                        end
    end

    def line2_text(row)
      customer = row['customer'].to_s.gsub("\t", ' ').strip
      line = customer.empty? ? row['title'].to_s.strip : customer
      line = line.upcase.gsub(/\s+/, ' ')
      truncate_line(line, 64)
    end

    def truncate_line(s, max)
      return s if s.length <= max

      "#{s[0, max - 1]}…"
    end

    def line2_font_size(line2)
      return 30 if line2.length <= 40
      return 26 if line2.length <= 52

      22
    end

    def build_svg(line2)
      fs2 = line2_font_size(line2)
      <<~SVG
        <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="#{WIDTH}" height="#{HEIGHT}" viewBox="0 0 #{WIDTH} #{HEIGHT}">
          <defs>
            <clipPath id="avatarClip">
              <circle cx="600" cy="210" r="108"/>
            </clipPath>
          </defs>
          <rect width="#{WIDTH}" height="#{HEIGHT}" fill="#ffffff"/>
          <circle cx="600" cy="210" r="108" fill="#f0f0f0"/>
          <image href="#{AVATAR_NAME}" xlink:href="#{AVATAR_NAME}" x="492" y="102" width="216" height="216" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
          <text x="600" y="400" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, Liberation Sans, sans-serif" font-weight="700" font-size="34" fill="#111111">FARSHAD NAYERI</text>
          <text x="600" y="458" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, Liberation Sans, sans-serif" font-weight="700" font-size="#{fs2}" fill="#111111">#{escape_xml(line2)}</text>
        </svg>
      SVG
    end

    def escape_xml(text)
      CGI.escapeHTML(text.to_s)
    end

    def render_png(cmd, line2, out_path, fn_src)
      Dir.mktmpdir('keyword-og') do |dir|
        FileUtils.cp(fn_src, File.join(dir, AVATAR_NAME))
        svg_path = File.join(dir, 'card.svg')
        File.write(svg_path, build_svg(line2), encoding: 'UTF-8')

        case cmd
        when :rsvg
          system('rsvg-convert', '-w', WIDTH.to_s, '-h', HEIGHT.to_s, '-o', out_path, svg_path)
        when :magick
          system('magick', svg_path, '-resize', "#{WIDTH}x#{HEIGHT}!", out_path)
        when :convert
          system('convert', svg_path, '-resize', "#{WIDTH}x#{HEIGHT}!", out_path)
        else
          false
        end
      end
    end
  end
end
