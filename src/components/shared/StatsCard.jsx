import React from 'react';
import './statsCard.css'
const StatsCard = ({ title, number, change }) => {
  return (
    <div className="stats-card">
        <div style={{borderBottom:'solid black 1px', width:'80%', marginBottom:'1em', display:'flex',flexDirection:'column', alignItems:'center',flexWrap:'wrap'}}>
      <h3 className="stats-card__title">{title}</h3>
      <p className="stats-card__number">{number}</p>
        </div>
      {change && <p className="stats-card__change">{change}</p>}
    </div>
  );
};

export default StatsCard;
