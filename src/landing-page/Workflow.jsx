import { CheckCircle2 } from "lucide-react";
import workflowImg from "../assets/workflow.jpg";
import { checklistItems } from "../landing-constants";

const Workflow = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Potencia tu hogar con{" "}
        <span className="bg-gradient-to-r from-[#6366f1] to-[#6366f170] text-transparent bg-clip-text">
          Perspectivas Inteligentes de Energía Solar.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2 flex justify-center items-center">
          <img src={workflowImg} alt="Coding" className="w-4/5 mx-auto h-auto"/>
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
