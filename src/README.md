# Farshad.io Portfolio

This is the source code for Farshad Nayeri's portfolio website built with Jekyll.

## Features

### Portfolio Filter System

The portfolio includes a comprehensive filter system that allows users to filter projects by:

#### Industry Categories:
- **Financial**: Banking, investment, and financial services projects
- **Healthcare**: Medical, health tech, and wellness applications
- **Retail**: E-commerce, store management, and retail solutions
- **Consumer**: Consumer-facing applications and products
- **Telecomm**: Telecommunications and network infrastructure
- **Management**: Business management and organizational tools

#### Technology Categories:
- **Native Apps**: iOS and Android mobile applications
- **Web Apps**: Web-based applications and platforms
- **API Design**: API development and integration
- **Blockchain**: Cryptocurrency and blockchain solutions
- **Cloud Services**: Cloud infrastructure and services
- **SaaS Platform**: Software-as-a-Service platforms
- **Analytics**: Data analysis and business intelligence
- **Visualization**: Data visualization and reporting tools
- **Architecture**: System architecture and design
- **Product Strategy**: Product planning and strategic development

### How to Use Filters

1. **Filter by Category**: Click on any filter tag to show only projects that match that category
2. **Clear Filters**: Use the "Clear All" button to reset all filters
3. **URL Persistence**: Filter selections are preserved in the URL for sharing
4. **Cross-Page Navigation**: Clicking tags on individual portfolio pages will filter the main portfolio

### Technical Implementation

- **Frontend**: Pure JavaScript with no external dependencies
- **Responsive Design**: Works on desktop and mobile devices
- **URL State Management**: Filter state is maintained in the browser URL
- **Performance**: Efficient filtering with minimal DOM manipulation

## Development

To run the site locally:

```bash
cd src
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`
