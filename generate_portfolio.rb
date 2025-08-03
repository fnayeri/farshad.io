#!/usr/bin/env ruby

require 'csv'
require 'fileutils'

# Read the CSV data
csv_file = 'src/_data/portfolio.csv'
portfolio_dir = 'src/portfolio'

# Create portfolio directory if it doesn't exist
FileUtils.mkdir_p(portfolio_dir) unless Dir.exist?(portfolio_dir)

# Read CSV and generate pages
CSV.foreach(csv_file, headers: true) do |row|
  next if row['name'].nil? || row['name'].strip.empty?
  next if row['name'].strip.start_with?('#')
  
  name = row['name'].strip
  permalink = row['permalink'] || name
  title = row['title'] || name
  customer = row['customer'] || ''
  role = row['role'] || ''
  body = row['body'] || ''
  problem = row['problem'] || ''
  stakes = row['stakes'] || ''
  discovery = row['discovery'] || ''
  outcome = row['outcome'] || ''
  tags = row['tags'] ? row['tags'].split(',').map(&:strip) : []
  color = row['color'] || '888'
  background = row['background'] || 'FFF'
  border = row['border'] || background
  
  # Create the markdown file
  filename = "#{portfolio_dir}/#{name}.md"
  
  content = <<~MARKDOWN
---
layout: portfolio
title: "#{title}"
customer: "#{customer}"
role: "#{role}"
body: "#{body}"
problem: "#{problem}"
stakes: "#{stakes}"
discovery: "#{discovery}"
outcome: "#{outcome}"
tags: #{tags.to_json}
color: "#{color}"
background: "#{background}"
border: "#{border}"
image: "/assets/logos/#{name}.png"
permalink: "/#{permalink}/"
---

#{body}

## Problem
#{problem}

## Stakes
#{stakes}

## Discovery
#{discovery}

## Outcome
#{outcome}
MARKDOWN

  File.write(filename, content)
  puts "Generated: #{filename}"
end

puts "Portfolio pages generated successfully!" 