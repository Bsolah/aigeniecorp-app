import { Icon } from '@iconify/react';
import { Link } from 'react-router';
const Feature = [
  {
    icon: 'tabler:chart-bubble',
    title: 'Centralized Knowledge Management',
    subtitle:
      'AI-powered knowledge base for seamless organization, secure access, and accurate retrieval. Integrates with Confluence, Notion, SharePoint, and more. AI chat delivers precise answers, refines SOPs, flags conflicts, and aligns teams effortlessly.',
    bgcolor: 'bg-lighterror',
    color: 'text-error',
  },
  {
    icon: 'tabler:building-store',
    title: 'AI Workflow Automation',
    subtitle:
      'Fully project-aware AI automates tasks, tracks meetings, and updates workflows—securely and effortlessly. Drag-and-drop builder simplifies summaries, follow-ups, data collection, and reporting, with seamless Slack, Teams, and chat integrations',
    bgcolor: 'bg-lightprimary',
    color: 'text-primary',
  },
  {
    icon: 'material-symbols:category-outline',
    title: 'Customizable Industry Templates',
    subtitle:
      'Pre-built Sales, HR, Ops, Finance, and Industry-specific templates for workflow automation, reports, and SOPs. Auto-fill with real-time data, customize, and deploy instantly—no setup needed.',
    bgcolor: 'bg-lightsuccess',
    color: 'text-success',
  },
  {
    icon: 'material-symbols:earthquake',
    title: 'AI-Powered Execution & Insights',
    subtitle:
      'AI analyzes data, suggests next steps, assigns tasks, and tracks progress with timeline, Kanban, and list views. Gain real-time insights for projects, feedback, risks, and reporting—without manual work.',
    bgcolor: 'bg-lightgray dark:bg-darkgray',
    color: 'text-dark dark:text-white',
  },
];

const Solution = () => {
  return (
    <div id="services">
      <div className="lg:py-24 py-12 dark:bg-dark">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30">
            <div className="lg:col-span-5 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white">
                Our solutions
              </h2>
              <p className="text-17 leading-[32px] text-ld opacity-80 py-6">
              Empowering your business with personalized, scalable solutions that drive growth.
              </p>
            </div>
            <div className="lg:col-span-7 col-span-12 lg:ps-5 ">
              <div className="grid grid-cols-12 md:gap-12 gap-6">
                {Feature.map((item, index) => {

                  // const parts = item.subtitle.split("-all in one place");
                  return (

                    <div className="md:col-span-6 col-span-12" key={index}>
                      <div
                        className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw ${item.bgcolor}`}
                      >
                        <Icon icon={item.icon} className={`${item.color}`} height={24} />
                      </div>
                      <h4 className="font-bold text-darklink dark:text-white py-5 text-22">
                        {item.title}
                      </h4>
                      <p className="text-15 text-ld opacity-80 md:pt-2 leading-6">
                        {item.subtitle}
                      </p>
                    </div>
                  )
                }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
