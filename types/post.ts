export interface Post {
  slug: string;
  excerpt: string;
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
  content: {
    json: any;
  };
}
