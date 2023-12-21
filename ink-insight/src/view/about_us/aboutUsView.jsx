import React from "react";
import "./aboutUsStyle.css";
import SohaNaeini from "../../assets/sohaNaeini.png";
import ermia from "../../assets/ermia.png";
import Merna from "../../assets/merna.jpg";
import p1 from "../../assets/P1.png"


const AboutUsView = () => {
  const teamMembers = [
    {
      name: "Soha Naeini",
      major: "Computer Science",
      github: "https://gits-15.sys.kth.se/naeini",
      email: "sohanaeini@gmail.com",
      image: SohaNaeini,
    },
    {
      name: "Ermia Ghaffari",
      major: "Information Technology",
      github: "https://github.com/ermia1230",
      email: "ermia@kth.se",
      image: ermia,
    },
    {
      name: "Merna Iskander",
      major: "Mechanical enginering",
      github: "https://gits-15.sys.kth.se/mnais",
      email: "mernaIskander35@gmail.com",
      image: Merna,
    },
    {
      name: "Daniel Ibrahimi ",
      major: "Information Technology",
      github: "https://github.com/daniel3178",
      email: "danielib@kth.se",
      image:p1,
    },
  ];

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h2>{member.name}</h2>
            <p>
              <strong>Major:</strong> {member.major}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                {member.github}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AboutUsView };
