# Phase 03: Dynamic Updates - Context

## Decisions
- **Gallery Structure**: Implement a single `/gallery` route with a category filtering system (All, Campus, NCC, Placements, Labs).
- **Interaction Style**: Use a **Lightbox** component for high-quality image viewing without page reloads.
- **Achievement Focus**: Build a dedicated "Placements & NCC Hub" to showcase the 123+ placed candidates and the Naval/Army wings.
- **Data Source**: Extend the local JSON data pattern to `lib/data/gallery.json` and `lib/data/placements.json`.
- **UI Aesthetics**: Maintain "Premium Academic" look with staggered grid layouts (Masonry style) for the gallery.

## Specifics
- **Placement Partners**: Showcase logos for TCS, Cognizant, Wipro, Aurobindo, Hetero, and Laurus Labs.
- **NCC Details**: Highlight the different wings (Army/Navy) and specific ranks/achievements mentioned in the pamphlet.
- **MSN Legacy**: Ensure the "Part of MSN Institutions" branding is consistent across these new sections.

## Deferred Ideas
- **Video Gallery**: Postponed to Phase 5 or later depending on performance.
- **Social Media Integration**: Instagram/Twitter feed integration deferred.

## Folded Todos
- (None)
