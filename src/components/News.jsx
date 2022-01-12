import React, { useState } from 'react'
import { Select, Row, Col, Card, Avatar, Typography } from 'antd'
import moment from "moment"
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from "react-router-dom"

const { Text, Title } = Typography
const { Option } = Select
const defaultImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count })
  const { data } = useGetCryptosQuery(100)

  if(isFetching) return 'Loading...'

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a crypto"
          optionFilterProp='children'
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
        >
          <option value="Cryptocurrency">Cryptocurrency</option>
          {
            data?.data?.coins.map(coin => (
              <option value={coin.name}>{coin.name}</option>
            ))
          }
        </Select>
      </Col>
      {
        cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <Card
              hoverable
              className="news-card"
            >
              <a href={news.url} target="_blank" rel="noreferer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img 
                    src={ news?.image?.thumbnail?.contentUrl || defaultImage }
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </div>
                <p>
                  {news.description}
                </p>

                <div className="provider-container">
                  <div>
                    <Avatar 
                      src={news?.provider[0]?.image?.thumbnail?.contentUrl || defaultImage}
                      alt="news"
                    />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{ moment(news.datePublished).startOf("ss").fromNow() }</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default News
