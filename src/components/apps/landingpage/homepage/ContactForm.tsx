import { Button, HR, Label, Textarea, TextInput } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

const ContactForm = () => {
  return (
    <div id="contact">
      <div className="container-1218 mx-auto mt-30 mb-40">
        <div className="grid grid-cols-12 lg:gap-30 gap-6 h-full items-stretch">
          <div className="lg:col-span-4 col-span-12 h-full">
            <div className="overflow-hidden rounded-tw bg-primary relative p-30 h-full flex flex-col after:absolute after:content-[''] after:bg-[url('/src/assets/images/front-pages/background/contact-icon.png')] after:bg-no-repeat after:bg-right-top after:top-0 after:right-0 after:w-[325px] after:h-[325px]">
              <h5 className="text-lg font-bold text-white pb-4">CONTACT US</h5>
              <p className="text-base text-white leading-7">Reach out to our sales team now</p>
              <HR className="border-t border-white/10 !bg-transparent" />
              <h5 className="text-lg font-bold text-white pb-4">Our Location</h5>
              <p className="text-base text-white leading-7">
                Visit us in person or find our contact details to connect with us directly.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12 h-full">
            <CardBox className="h-full flex flex-col">
              <div className="grid grid-cols-12 lg:gap-30 gap-6">
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="nm" value="First Name *" />
                  </div>
                  <TextInput
                    id="nm"
                    type="text"
                    placeholder="Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="lnm" value="Last Name *" />
                  </div>
                  <TextInput
                    id="lnm"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="ph" value="Phone Number *" />
                  </div>
                  <TextInput
                    id="ph"
                    type="number"
                    placeholder="xxx xxx xxxx"
                    required
                    className="form-control"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="em" value="Email *" />
                  </div>
                  <TextInput
                    id="em"
                    type="email"
                    placeholder="Email address"
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="nm" value="Company Name" />
                  </div>
                  <TextInput
                    id="nm"
                    type="text"
                    placeholder="Company Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="msg" value="Message" />
                  </div>
                  <Textarea
                    id="msg"
                    placeholder="Write your message here..."
                    required
                    className="form-control-textarera rounded-md"
                    rows={4}
                  />
                </div>
                <div className="col-span-12">
                  <div className="block">
                    <Button color={'primary'} className="sm:w-auto w-full ms-auto">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
