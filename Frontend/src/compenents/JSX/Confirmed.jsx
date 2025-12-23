import { useNavigate } from 'react-router-dom';
import '../CSS/Confirmed.css';

const Confirmed = () => {
  const navigate=useNavigate()
  const onProceed =()=>{
    navigate("/ordered")
  }
  return (
    <div className="confirmed-container">
      <div className="card">
        <div className="icon-container">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you! Your payment has been processed successfully.</p>
        <button className="proceed-button" onClick={onProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Confirmed;
