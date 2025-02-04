import { useState } from 'react';
import mainbanner from '/src/assets/images/front-pages/background/feature-image.png';
const About = () => {
  // Custom Tab
  const [activeTab, setActiveTab] = useState('Team Scheduling');

  return (
    <div id="about">
      <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30  items-center">
            <div className="lg:col-span-6 col-span-12">
              <img src={mainbanner} className="w-full" alt="banner" />
            </div>
            <div className="lg:col-span-6 col-span-12 lg:ps-7">
              {activeTab === 'Team Scheduling' && (
                <>
                  <p
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    ABOUT US
                  </p>
                  <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white pb-6">
                    Work Smarter, Grow Faster
                  </h2>
                  <p
                    style={{
                      lineHeight: 2,
                      marginBottom: 7,
                      color: '#333',
                    }}
                  >
                    At AI Ops Genie, we’re transforming how teams operate with an all-in-one
                    platform powered by AI. Our solution combines workflow automation, intelligent
                    insights, centralized knowledge, and smart AI co-pilots, eliminating
                    inefficiencies and empowering teams to focus on what truly matters. Seamlessly
                    integrating with tools like Slack, Zendesk, Salesforce, and Confluence, we
                    provide a unified experience that simplifies collaboration and drives results.
                  </p>
                  <p
                    style={{
                      lineHeight: 2,
                      color: '#333',
                    }}
                  >
                    Designed by professionals who’ve experienced the challenges of scaling
                    operations firsthand, AI Ops Genie is built for businesses aiming to streamline
                    processes, make data-driven decisions, and stay ahead in a competitive world.
                    Choose us to revolutionize the way you work: efficient, seamless, and
                    future-ready
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
