import { useState } from 'react';
import mainbanner from '/src/assets/images/front-pages/background/feature-image.png';

import RevenueByProduct from "../layout/RevenueByProduct";

const About = () => {
  // Custom Tab
  const [activeTab, setActiveTab] = useState('Team Scheduling');

  return (
    <div id="about">
      <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30  items-center">
            <div className="lg:col-span-7 col-span-12">
              <RevenueByProduct />
            </div>
            <div className="lg:col-span-5 col-span-12 lg:ps-7">
              {activeTab === 'Team Scheduling' && (
                <>
                  <p
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    ABOUT US
                  </p>
                  <h2 className="sm:text-44 text-3xl font-bold !leading-[43px] text-darklink dark:text-white pb-6">
                    Work Smarter, Grow Faster
                  </h2>
                  <p
                    style={{
                      lineHeight: 2,
                      marginBottom: 7,
                      color: '#333',
                    }}
                  >
                    At AI Genie Corp, we democratize AI for businesses of all sizes, turning complexity into clarity. Founded by a team of AI specialists and operations experts, we build tools that adapt to your needs—not the other way around.
                  </p>
                  <p
                    style={{
                      lineHeight: 2,
                      color: '#333',
                      paddingTop: 12,
                    }}
                  >
                    <b>Why Choose Us?</b>
                    <br />
                    <ul className='text-xs pt-2 flex flex-col' style={{listStyle: "circle", paddingLeft: 'revert'}}>
                      <li className='text-sm mt-3'><b>Accuracy First:</b> Avoid AI hallucinations with enterprise-grade validation and source citations. </li>
                      <li className='text-sm mt-3'> <b>No Engineering Required:</b> Design workflows in minutes, not weeks.</li>
                      <li className='text-sm mt-3'> <b>Adaptive Intelligence:</b> AI agents learn your team’s patterns and optimize over time.</li>
                      <li className='text-sm mt-3'> <b>Enterprise-Grade Security:</b> GDPR, ISO, and SOC2 compliant with end-to-end encryption.</li>
                    </ul>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
