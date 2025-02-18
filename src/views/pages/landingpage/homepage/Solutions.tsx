import { Icon } from '@iconify/react';

const Feature = [
  {
    icon: 'mdi:security',
    title: 'Enterprise-Grade Security',
    subtitle:
      'Your data stays protected at all times. With end-to-end encryption, access control, and zero external leaks, AI Genie ensures your company’s sensitive information remains private and secure.',
    bgcolor: 'bg-lighterror',
    color: 'text-error',
  },
  {
    icon: 'icon-park-outline:brain',
    title: 'Unified Knowledge Hub',
    subtitle:
      'No more scattered information. AI Genie centralizes all company knowledge into a single, dynamic hub, delivering fast, reliable answers to employees with AI-powered precision.',
    bgcolor: 'bg-lightwarning',
    color: 'text-warning',
  },
  {
    icon: 'octicon:zap',
    title: 'Efficiency Without Compromise',
    subtitle:
      'Boost employee productivity while staying compliant. AI Genie leverages your company’s private LLM, ensuring accuracy, real-time updates, and context-aware responses tailored to your business needs.',
    bgcolor: 'bg-lightprimary',
    color: 'text-primary',
  },
  {
    icon: 'fluent-mdl2:compliance-audit',
    title: 'Regulatory Continuous Monitoring',
    subtitle:
      'Stay compliant with real-time web crawling and API integrations with regulatory bodies. Audit logs track all content changes, ensuring transparency and accountability across your organization.',
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
                What We Offer
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
