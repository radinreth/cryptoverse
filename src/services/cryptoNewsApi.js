import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const cryptoNewsApiheaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': 'tRk0OPtuZEmshcpz2HR6uv5kZ17Sp1EAsQVjsndD5zEFZcyanF'
}

const createRequest = (url) => ({ url, headers: cryptoNewsApiheaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
