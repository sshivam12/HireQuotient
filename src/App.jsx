import { useState, useEffect } from 'react';
import Cash from './Cash'
import Bond from './Bond'
import Equity from './Equity'
import Fund from './Fund'
import Loan from './Loan'
import './App.css'
import axios from 'axios'


const API_URL = 'https://canopy-frontend-task.now.sh/api/holdings';

const App = () => {
  const [holdings, setHoldings] = useState([])
  const [showDetails, setShowDetails] = useState(false)
  const [isArrowUp, setIsArrowUp] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL)
        setHoldings(response.data.payload)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData()
  }, [])

  const realEstateHoldings = holdings.filter(holding => holding.asset_class === 'Real Estate');
  console.log('Real Estate Holdings:', realEstateHoldings);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsArrowUp(prevState => !prevState); 
  };

  return (
    <div>
      <h4 className="real-estate" onClick={toggleDetails}> &nbsp; &nbsp;
        {isArrowUp ? <i className="bi bi-arrow-up-circle-fill"></i> : <i className="bi bi-arrow-down-circle-fill"></i>}
        &nbsp; REAL ESTATE ({realEstateHoldings.length})
      </h4>
      {showDetails && (
        <div className="real-container" >
          <table>
            <thead style={{ paddingRight: '1rem', backgroundColor:"aliceblue",  boxShadow: '0px 1px 3px rgba(181, 175, 175, 0.5)', borderRadius:"10px"}}>
              <tr style={{color:'gray', fontFamily:"sans-serif"}}>
              <th >NAME OF THE HOLDING</th>
        <th >TICKER</th>
        <th >AVERAGE PRICE</th>
        <th >MARKET PRICE</th>
        <th>LATEST CHANGE PERCENTAGE</th>
        <th style={{ paddingRight: '3rem',backgroundColor:"aliceblue"  }}>MARKET VALUE IN BASE CCY</th>
              </tr>
            </thead>
            <tbody>
              {realEstateHoldings.map((holding, index) => (
                <tr style={{  backgroundColor:"#c8d9dc", height: '60px' , 
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)', borderRadius:"8px"}}key={index}>
                  <td>{holding.name || 'NA'}</td>
                  <td>{holding.ticker || 'NA'}</td>
                  <td>{holding.avg_price || 'NA'}</td>
                  <td>{holding.market_price || 'NA'}</td>
                  <td>{holding.latest_chg_pct || 'NA'}</td>
                  <td>{holding.market_value_ccy || 'NA'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Cash/>
      <Bond/>
      <Equity/>
      <Fund/>
      <Loan/>
    </div>
  );
};

export default App
