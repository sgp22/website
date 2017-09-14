export interface Post{
  userId: number,
  id: number,
  title: string,
  body: string
}

interface Pages{
  id: number,
  meta: {
    type: string,
    detail_url: string
  },
  title: string
}