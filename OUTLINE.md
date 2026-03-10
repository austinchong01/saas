# Brand/Creator Platform Outline

## Core Functionalities
- Creator Search
    - follower range (min, max)
    - engagement rate
    - median_views
    - industry?
    - niche
    - fit_percentage (based on filters)
    - country
    - language?
    - active account? (published video within 2 months)
    - gender

- Campaign Management
    - group creators by campaign
    - companies CRUD creators
    - 
- Payment Processing
    - tokenization? free trial?

## Helper Functionalities
- Creator Search
    - by username
- OAuth Login
- 

## Data Schema
- User
    - membership?
    - Creator (FK)
    - Campaign (FK)
- Creator
    - bio
    - growth?
    - rank?
    - link to profile
    - Campaign (FK)
    - membership?
- Company
    - name
    - industry
    - bio
    - description
    - Saved Creators (FK)
    - Campaigns (FK)
- Campaign
    - dates
    - budget
    - 

### Other Notes
- Address TikTok APIs
    - see parameters
    - see responses
    - address feasibility
        - need to save to db?
- Testing
    - mock data
    - test cases
        - unit, integrated, E2E
- Sanitation/Validation
- Security
- SEO
- Find libraries
- Mono  vs Duo Repository

## Technology Stack
- Next.js (TypeScript)
- PostgreSQL
    - Drizzle?
- Figma?
- 