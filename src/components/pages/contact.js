import React, { Profiler } from "react";
import contact from "../style/img/space.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function() {
  return(
    <div className="content-page-wrapper">
      <div 
        className="left=column" style={{
          background: "url(" + contact + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} 
      />
      <div className="right-column">
        <div className="contact-bullet-points">
          <div className="bullet-point-group">

            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>

            <div className="text">
              +1 636 109 8216
            </div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" />
            </div>

            <div className="text">
              selcyc@example.com
            </div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marker-alt" />
            </div>

            <div className="text">
              Mexico
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}
