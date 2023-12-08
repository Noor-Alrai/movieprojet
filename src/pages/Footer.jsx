import React from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin} from '@fortawesome/free-brands-svg-icons';
config.autoAddCss = false;
const Footer = () => {
  const teamMembers = [
    { name: `Noor Alra'i`, github: 'https://github.com/Noor-Alrai', linkedin: 'https://www.linkedin.com/in/noor-alrai/' },
    { name: 'Lubna Abdalkhaliq', github: 'https://github.com/Lubnabd', linkedin: 'https://www.linkedin.com/in/lubna-abdelkhaliq-09020a18b/' },
    { name: 'Wajd Al-Kayyali', github: 'https://github.com/Wajd-AlKayyali', linkedin: 'https://www.linkedin.com/in/wajd-al-kayyali/' },
    { name: 'Lin Daaboul', github: 'https://github.com/leen-gh/', linkedin: 'https://www.linkedin.com/in/leen-ghalib-398b3815a/' },

  ];

  return (
    <footer>
      <div className="credits" style={{backgroundColor:"white", position:"fixed", bottom:1 , width:"100vw"}}>
        <ul style={{display:"flex", flexWrap:"wrap", padding:"16px"}}>
          {teamMembers.map((member, index) => (
            <li key={index} style={{width:"25%"}}>
              {member.name} -{' '}
              <a href={member.github} target="_blank" rel="noopener noreferrer">
               GitHub
              </a>{' '}
              |{' '}
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            
               LinkedIn
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
