import React from "react";
import "../CSS/About.css"


const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>
        <p>
          I’m a passionate web developer specializing in building modern,
          responsive, and high–quality web applications using React, JavaScript,
          and CSS. I focus on creating clean, efficient UI components and smooth
          user experiences.
        </p>

        <p>
          I enjoy solving complex problems, designing intuitive interfaces, and
          turning ideas into functional, polished digital products. I stay
          up-to-date with the latest tools, frameworks, and best practices in
          front-end development.
        </p>

        <h2>Skills</h2>
        <ul className="skills-list">
          <li>React / React Native</li>
          <li>Express / Node.js</li>
          <li>MongoDB/MySQL</li>
          <li>Python(Django)</li>
          <li>Git / GitHub</li>
        </ul>

        <h2>What I Do</h2>
        <p>
          I help people and businesses build fast, modern web applications
          with clean code and a strong focus on maintainability.
        </p>
      </div>
    </section>
  );
};

export default About;
