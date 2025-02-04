import { Icon } from '@iconify/react';
import { Link } from 'react-router';
const Feature = [
  {
    icon: 'tabler:chart-bubble',
    title: 'Central Knowledge Hub',
    subtitle:
      'Bring all your company knowledge into one accessible platform. Organizing SOPs, training materials, and document in a single repository, ensuring consistency and compliance.',
    bgcolor: 'bg-lighterror',
    color: 'text-error',
  },
  {
    icon: 'tabler:building-store',
    title: 'Intelligent Analytics',
    subtitle:
      'Leverage real-time dashboards and advanced analytics to gain actionable insights. Understand customer feedback, track performance metrics, and make data-driven decisions with ease.',
    bgcolor: 'bg-lightprimary',
    color: 'text-primary',
  },
  {
    icon: 'material-symbols:category-outline',
    title: 'Smart Workflow Automation',
    subtitle:
      'Optimize and streamline your processes with Al-powered tools for task tracking, document management, and automated updates. Eliminate repetitive tasks and keep your team focused on high-value work.',
    bgcolor: 'bg-lightsuccess',
    color: 'text-success',
  },
  {
    icon: 'material-symbols:earthquake',
    title: 'Genius AI Assistants & Integrations',
    subtitle:
      'Empower your team with smart AI co-pilots and agents to execute tasks, provide real-time Q&A, and automate workflows. Seamlessly connect with platforms like Zendesk, HubSpot, Salesforce, and more, ensuring a unified and efficient experience without switching tools.',
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
                Pellentesque varius semper odio non pretium. Nullam sagittis neque orci, eu
                elementum enim.
              </p>
            </div>
            <div className="lg:col-span-7 col-span-12 lg:ps-5 ">
              <div className="grid grid-cols-12 md:gap-12 gap-6">
                {Feature.map((item, index) => (
                  <div className="md:col-span-6 col-span-12" key={index}>
                    <div
                      className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw ${item.bgcolor}`}
                    >
                      <Icon icon={item.icon} className={`${item.color}`} height={24} />
                    </div>
                    <h4 className="font-bold text-darklink dark:text-white py-5 text-22">
                      {item.title}
                    </h4>
                    <p className="text-15 text-ld opacity-80 md:pt-2 leading-6">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
