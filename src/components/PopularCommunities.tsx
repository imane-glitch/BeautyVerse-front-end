import { useState } from "react";
import "./PopularCommunities.css";

function PopularCommunities() {
  const [showAll, setShowAll] = useState(false);

  const communities = [
    { name: "r/MySkin", members: "23 201 199", color: "pink" },
    { name: "r/Notfunny", members: "23 247 149", color: "yellow" },
    { name: "r/Tinder", members: "765 209", color: "red" },
    { name: "r/Music", members: "601 234", color: "purple" },
    { name: "r/iphone", members: "601 974", color: "blue" },
    { name: "r/NFL", members: "547 703", color: "nfl" },
    { name: "r/Piercing", members: "538 635", color: "brown" },
    { name: "r/WorldNews", members: "476 685", color: "gray" },
    { name: "r/OverWatch", members: "469 247", color: "overwatch" },
  ];

  const visibleCommunities = showAll ? communities : communities.slice(0, 4);

  return (
    <div className="popular-box">
      <h2 className="popular-title">COMMUNAUTÉS POPULAIRES</h2>

      {visibleCommunities.map((community, index) => (
        <div className="community" key={index}>
          <div className="left-side">
            <div className={`circle ${community.color}`}></div>
            <div>
              <p className="name">{community.name}</p>
              <p className="members">{community.members} membres</p>
            </div>
          </div>
        </div>
      ))}

      <p
        className="more"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Moins" : "Voir plus"}
      </p>
    </div>
  );
}

export default PopularCommunities;
