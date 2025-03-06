import { Icon } from '@iconify/react';

const Feature = [
  {
    icon: 'mdi:security',
    title: '75% Companies Can\'t Track AI Leaks',
    subtitle: 'AI Genie provides real-time visibility into attempted AI data leaks. Companies get actionable insights on what employees are trying to share, allowing them to address risks before they become security breaches.',
    bgcolor: 'bg-lighterror',
    color: 'text-error',
  },
  {
    icon: 'icon-park-outline:brain',
    title: '11% Data Pasted Is Confidential',
    subtitle: 'AI Genie screens data inputs into AI tools, blocking confidential information. This mechanism prevents exposure and ensures sensitive data stays protected, helping organizations comply with privacy regulations.',
    bgcolor: 'bg-lightwarning',
    color: 'text-warning',
  },
  {
    icon: 'octicon:zap',
    title: '$4.45M – Avg Breach Cost',
    subtitle: 'By intercepting unauthorized AI data usage instantly, AI Genie significantly reduces the risk of costly data breaches and regulatory fines. Its proactive approach stops non-compliant activities before they occur, effectively safeguarding financial resources and preserving organizational reputation.',
    bgcolor: 'bg-lightprimary',
    color: 'text-primary',
  },
  {
    icon: 'fluent-mdl2:compliance-audit',
    title: '69% Use AI Even if Banned',
    subtitle: 'Recognizing that employees often find ways to use AI despite restrictions, AI Genie provides a secure framework for AI adoption. It enables safe utilization of AI tools by ensuring that even when AI is used, sensitive data never leaves the company, maintaining both innovation and security.',
    bgcolor: 'bg-lightsuccess',
    color: 'text-success',
  },
];

const Solution = () => {
  return (
    <div id="services">
      <div className="lg:py-24 py-12 dark:bg-dark">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30">
            <div className="lg:col-span-5 col-span-12">
              <h2 className="sm:text-40 text-3xl font-bold !leading-[48px] text-darklink dark:text-white">
                Problems we solve
              </h2>
              <p className="text-17 leading-[32px] text-ld opacity-80 py-6">
                Empower Your Teams with Secure, Compliant & Accurate AI              </p>

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
                      <h4 className="font-bold text-darklink dark:text-white py-5 text-22 leading-tight">
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
