import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://canopy-frontend-task.now.sh/api/holdings';

const Loan = () => {
  const [holdings, setHoldings] = useState([]);
  const [showDetails, setShowDetails] = useState(false)
  const [isArrowUp, setIsArrowUp] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setHoldings(response.data.payload);
      } catch (error) {
        console.error('Error in data', error);
      }
    };

    fetchData();
  }, []);

  const loanHoldings = holdings.filter(holding => holding.asset_class === 'Loan');
  console.log('cash Holdings:', loanHoldings);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsArrowUp(prevState => !prevState); 
  };

  return (
    <div>
      <h4 className="real-estate" onClick={toggleDetails}> &nbsp; &nbsp;
        {isArrowUp ? <i className="bi bi-arrow-up-circle-fill"></i> : <i className="bi bi-arrow-down-circle-fill"></i>}
        &nbsp; LOAN ({loanHoldings.length})
      </h4>
      {showDetails && (
        <div className="cash-container" >
          <table>
            <thead style={{ backgroundColor:"aliceblue", 
             boxShadow: '0px 1px 3px rgba(181, 175, 175, 0.5)', 
             borderRadius:"10px", height:"50px"}}>
              <tr style={{color:'gray', fontFamily:"sans-serif"}}>
              <th style={{ paddingRight: '5rem' }}>NAME OF THE HOLDING</th>
        <th style={{ paddingRight: '2rem' }}>TICKER</th>
        <th style={{ paddingRight: '2rem' }}>AVERAGE PRICE</th>
        <th style={{ paddingRight: '2rem' }}>MARKET PRICE</th>
        <th style={{ paddingRight: '2rem' }}>LATEST CHANGE PERCENTAGE</th>
        <th style={{ paddingRight: '2rem',backgroundColor:"aliceblue"  }}>MARKET VALUE IN BASE CCY</th>
              </tr>
            </thead>
            <tbody >
              {loanHoldings.map((holding, index) => (
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
    </div>
  );
};

export default Loan;
