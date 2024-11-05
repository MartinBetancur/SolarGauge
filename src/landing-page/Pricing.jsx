import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../landing-constants";

const Pricing = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        Our Pricing
      </h2>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl mx-auto">
        Real-time tracking of your energy consumption by the hour, empowering businesses to make informed decisions and optimize their energy usage efficiently.
      </p>
      <div className="flex flex-wrap justify-center"> 
        {pricingOptions.map((option, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2"> 
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Pro" && (
                  <span className="bg-gradient-to-r from-[#00ffba] to-[#00ffba60] text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Most Popular)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span className="text-neutral-400 tracking-tight">/Month</span>
              </p>
              <ul>
                {option.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/login"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-[#00ffba95] border border-[#00ffba] rounded-lg transition duration-200"
              >
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
