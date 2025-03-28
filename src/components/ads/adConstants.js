export const AD_FORMATS = {
  auto: { display: "block" },
  fluid: { display: "block" },
  rectangle: { display: "inline-block", width: "300px", height: "250px" },
  horizontal: { display: "inline-block", width: "728px", height: "90px" },
  vertical: { display: "inline-block", width: "160px", height: "600px" },
};

// These are example slots - replace with your actual ad unit IDs
export const AD_SLOTS = {
  HEADER_AD: "7684054482",
  SIDEBAR_AD: "6903625164",
  IN_ARTICLE_AD: "2384165349",
  FOOTER_AD: "7684054482",
  RESPONSIVE_AD: "responsive-ad-slot-id",
  MULTIPLEX_VERTICAL_AD: "2416789086",
  SQUARE_RESPONSIVE_AD: "4660605203"
};

// Configuration for ad placement
export const AD_CONFIG = {
  TABLE_ROW_CHUNK_SIZE: 25,  // Number of rows between ads in tables
  ARTICLE_PARAGRAPH_CHUNK_SIZE: 3, // Number of paragraphs between ads in articles
};
