export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
};

export interface Pages {
  id: number,
  meta: {
    type: string,
    detail_url: string
  },
  title: string
};
