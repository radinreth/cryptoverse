import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { 
  MoneyCollectOutlined,
  DollarCircleOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  FundOutlined,
  CheckOutlined,
  StopOutlined,
  ExclamationCircleOutlined } from '@ant-design/icons/lib/icons'
import { useGetCryptoDetailsQuery } from '../services/cryptoApi'

const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinUuid } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')

  const { data, isFetching } = useGetCryptoDetailsQuery({coinUuid, timePeriod})
  const cryptoDetails = data?.data?.coin;
  
  const time = ['24h', '7d', '30d'];

  if(isFetching) return "Loading..."

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  console.log(cryptoDetails)
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>

      <Select
        defaultValue={timePeriod}
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
        optionFilterProp='children'
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
      >
        {
          time.map(t => <Option key={t} value={t}>{t}</Option>)
        }
      </Select>
      {timePeriod}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              {cryptoDetails.name} value statistics
            </Title>

            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>

          {
            stats.map(({title, value, icon}) => (
              <Col className='coin-stats' key={value}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))
          }
        </Col>

        <Col className='coin-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              Other statistics
            </Title>

            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>

          {
            genericStats.map(({title, value, icon}) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))
          }
        </Col>
      </Col>

      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title className='coin-details-heading' level={4}>
            what is {cryptoDetails.name}
          </Title>
          
          {HTMLReactParser(cryptoDetails.description)}
        </Row>

        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} links
          </Title>

          {
            cryptoDetails.links.map(link => (
              <Row className='coin-link' key={link.name}>
                <Title level={5} className='link-name'>
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel='noreferer'>
                  {link.name}
                </a>
              </Row>
            ))
          }
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
