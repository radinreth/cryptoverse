import React from 'react'
// import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from "antd"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  let coinPrices = []
  let coinTimestamps = []

  for(let i=0; i<coinHistory?.data?.history?.length; i+=1) {
    coinPrices.push(coinHistory.data.history[i].price)
    coinTimestamps.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>

        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className='current-price'>
            current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>

      <Line data={data} />
    </>
  )
}

export default LineChart
