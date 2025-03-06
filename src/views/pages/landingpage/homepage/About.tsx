// import RevenueByProduct from "../layout/RevenueByProduct";
import AutoPlayVideo from "../layout/AutoPlay";

const About = () => {
  // Custom Tab

  return (
    <div id="about">
      <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30  items-center">
            <div className="lg:col-span-7 col-span-12">
              <div className="video-container">
                <AutoPlayVideo />
              </div>
            </div>
            <div className="lg:col-span-5 col-span-12 lg:ps-7">
              <>
                <p
                  style={{
                    marginBottom: 5,
                  }}
                >
                  Why AI Genie
                </p>
                <h2 className="sm:text-40 text-3xl font-bold !leading-[43px] text-darklink dark:text-white pb-6">
                  No Leaks. Just Safe AI.
                </h2>
                <p
                  style={{
                    lineHeight: 2,
                    marginBottom: 7,
                    color: '#333',
                  }}
                > Built by experts in AI, security, and compliance, we help enterprises harness AI without risk or complexity.                </p>
                <p
                  style={{
                    lineHeight: 2,
                    color: '#333',
                    paddingTop: 12,
                  }}
                >
                  <b>Why Choose AI Genie?</b>
                  <br />
                  <div className='text-xs pt-2 flex flex-col' style={{ listStyle: "circle", paddingLeft: 'revert' }}>
                    <div className='text-sm mt-3 mx-3'><b>✅ Security First: </b> Enterprise-grade security with no risk of leaks thanks to our interceptor.</div>
                    <div className='text-sm mt-3 mx-3'> <b>✅ Always Accurate:</b> Continuous updates ensure compliance and consistency.</div>
                    <div className='text-sm mt-3 mx-3'> <b>✅ One Hub, All Knowledge:</b> No more searching through scattered documents.</div>
                    <div className='text-sm mt-3 mx-3'> <b>✅ Seamless Integration:</b> Works with your existing tools, APIs, and regulatory databases.</div>
                    <div className='text-sm mt-3 mx-3'> <b>✅ AI-Powered Compliance:</b> Context-aware responses, change tracking, and automatic updates.</div>
                  </div>
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
