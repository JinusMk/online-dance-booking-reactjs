export const responsiveCarousel = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1279 },
      items: 3,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 1279, min: 960 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 959, min: 599 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    }
};