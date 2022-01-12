import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'tRk0OPtuZEmshcpz2HR6uv5kZ17Sp1EAsQVjsndD5zEFZcyanF'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: ({coinUuid, timePeriod}) => createRequest(`/coin/${coinUuid}?timePeriod=${timePeriod}`)
    })
  })
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
} = cryptoApi;
