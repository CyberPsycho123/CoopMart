import React, { useState } from "react";
import "../CSS/SellerTerms.css";
import { useNavigate } from "react-router-dom";

export default function SellerTerms() {
  const [checked, setChecked] = useState(false);
  const navigate=useNavigate()
  return (
    <div className="terms-page">
      <div className="terms-card">
        <h1 className="terms-title">Seller Terms & Conditions</h1>

        <div className="terms-content">
          <p>
            By registering as a seller on our platform, you agree to comply
            with the following terms and conditions. Please read them carefully
            before proceeding.
          </p>

          <h3>1. Commission Policy</h3>
          <p>
            The seller agrees to pay a commission of <strong>20%</strong> on
            each successfully sold product through the platform. This
            commission will be automatically calculated based on the final
            selling price of the product.
          </p>

          <h3>2. Payment & Settlement</h3>
          <p>
            The remaining amount after commission deduction will be transferred
            to the seller by the company. All payouts will be processed through
            a valid <strong>UPI application</strong>.
          </p>

          <h3>3. UPI Requirement</h3>
          <p>
            The seller must have an active UPI account that is linked to a
            <strong> valid phone number</strong>. This phone number must be
            provided accurately during registration to ensure smooth payment
            transfers.
          </p>

          <h3>4. Accuracy of Information</h3>
          <p>
            The seller is responsible for providing correct personal,
            business, and payment-related information. The company will not
            be liable for delays or failures caused by incorrect details.
          </p>

          <h3>5. Acceptance of Terms</h3>
          <p>
            By clicking <strong>“I Agree & Continue”</strong>, the seller
            confirms that they have read, understood, and accepted all the
            terms and conditions mentioned above.
          </p>
        </div>

        <div className="terms-actions">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <span>I agree to the Terms & Conditions</span>
          </label>

          <button className="agree-btn" disabled={!checked} onClick={()=>navigate("/sellerdetails")}>
            I Agree & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
