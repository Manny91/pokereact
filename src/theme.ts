export const theme = {
  colors: {
    red: "red",
    white: "white",
    lightGreen: "green"
  },
  media: {
    sm: `(min-width: 568px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 992px)`,
    xl: `(min-width: 1366px)`,
    xxl: `(min-width: 1920px)`
  },
  spacing: {
    xs: "5px",
    sm: "10px",
    md: "20px",
    lg: "30px"
  }
};

export type Theme = typeof theme;
