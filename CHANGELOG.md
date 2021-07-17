# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
- [015-img-fix] instead of width/height on img, just use object-fit. loses support in IE lol

## [0.5.0]
- [014-mobile-view] mobile view! search bar is now a toggleable element.
- [013-misc-adjusting] spacing div at bottom of page + enter activates searchbar + cursor starts in searchbar. images don't scale oddly

## [0.4.0]
- [012-force-en] force english translations

## [0.3.0]
- [011-page-fix] bugfix: clicking new chapters to start, force cast to int on reader navigation, project is dev/prod sensitive

## [0.2.0]
- [010-nginx-proxy] point host to nginx proxy until i hear from em

## [0.1.0] initial beta release
- Initial app setup (react, webpack, babel)
- [001-hotloading] Added hotloading
- [002-basiclayout] Added css support, layout skeleton and established authorization
- [003-populate-navigator] Added manga and chapter list rendering, passes data to reader component
- [004-refactor-metadata] Metadata replaced with MangaList, Volume, Chapter and dynamic loading of content/links
- [005-load-page] Pages loading and navigation now possible
- [006-key-navigation] Arrow keys move from page to page. <img> tags are stored instead of re-generated every time
- [007-todos] Fix navigation bug, overlapping css, move some state up to context
- [008-progress-bar] Add progress bar (clickable)
- [github push] update strings for consumption
- [009-simplification] comment out partial features, simplify view
