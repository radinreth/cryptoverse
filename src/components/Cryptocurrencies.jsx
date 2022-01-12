import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100

  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [cryptoList, searchTerm])

  if(isFetching) return 'loading...'

  return (
    <>
      <div className='search-crypto'>
        <Input placeholder='Search cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>

      <p>
        <strong>{cryptos.length}</strong> result(s) found from <strong>{searchTerm}</strong> keywords
      </p>

      <Row gutter={[12, 12]} className='crypto-card-container'>
        {
          cryptos?.map((crypto) => (
            <Col xs={24} sm={12} md={6} className="crypto-card" key={crypto.uuid}>
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={<img src={crypto.iconUrl} className="crypto-image" />}
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies
