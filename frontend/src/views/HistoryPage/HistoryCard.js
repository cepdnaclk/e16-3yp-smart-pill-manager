import ContainerDetails from "../ContainersPage/ContainerDetails";
import React from "react";
import "../../assets/css/card.css";

function HistoryCard({
  medicine,
  startDate,
  endDate,
  patientID,
  containerID,
  routine,
}) {
  return (
    <div className="card-container">
      <div className="card-number">
        <p>{containerID}</p>
      </div>
      <div className="card-title">
        <h1>{medicine}</h1>
        <p>{endDate.slice(0, 10)}</p>
      </div>
      <div className="card-description">
        <li>MORNING TIME: {routine[0].time}</li>
        <li>AFTERNOON TIME: {routine[1].time}</li>
        <li>EVENING TIME: {routine[2].time}</li>
      </div>
      <div className="card-more">
        <ContainerDetails
          className="card-btn btn-more"
          medicine={medicine}
          startDate={startDate.slice(0, 10)}
          endDate={endDate.slice(0, 10)}
          containerID={containerID}
          patientID={patientID}
          routine={routine}
        />
      </div>
    </div>
  );
}

export default HistoryCard;
