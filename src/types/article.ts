export interface Article {
  web_url: string;
  snippet: string;
  print_page: number;
  print_section: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  word_count: number;
  uri: string;
}

export interface Multimedia {
  caption: string;
  credit: string;
  default: Image;
  thumbnail: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Headline {
  main: string;
  kicker?: string;
  print_headline?: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
}

export interface Byline {
  original: string;
}

export interface SearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    metadata: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface SearchParams {
  q: string;
  page?: number;
  sort?: 'newest' | 'oldest' | 'relevance';
  begin_date?: string;
  end_date?: string;
  fq?: string;
}
