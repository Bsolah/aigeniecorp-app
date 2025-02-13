

const About = () => {
  // Custom Tab


  return (
    <div id="about">
      <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30  items-center">
            {/* <div className="lg:col-span-7 col-span-12">
              <RevenueByProduct />
            </div> */}
            <div className="lg:col-span-5 col-span-12 lg:ps-7">
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
                    <b>Why Choose AI Genie?</b>
                    <br />
                    <ul className='text-xs pt-2 flex flex-col' style={{listStyle: "circle", paddingLeft: 'revert'}}>
                      <li className='text-sm mt-3'><b>✅ Security First: </b> Enterprise-grade security with no risk of leaks thanks to our interceptor.</li>
                      <li className='text-sm mt-3'> <b>✅ Always Accurate:</b> Continuous updates ensure compliance and consistency.</li>
                      <li className='text-sm mt-3'> <b>✅ One Hub, All Knowledge:</b> No more searching through scattered documents.</li>
                      <li className='text-sm mt-3'> <b>✅ Seamless Integration:</b> Works with your existing tools, APIs, and regulatory databases.</li>
                      <li className='text-sm mt-3'> <b>✅ AI-Powered Compliance:</b> Context-aware responses, change tracking, and automatic updates.</li>
                      <li className='text-sm mt-3'> <b>✅ Cheaper Than DIY:</b> Save $500k+ vs. building in-house.
                      </li>
                    </ul>
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
