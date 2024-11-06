import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Convierte tus datos de energía en
        <span className="bg-gradient-to-r from-[#6366f1] to-[#6366f160] text-transparent bg-clip-text">
          {" "}AHORROS REALES
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Seguimiento en tiempo real de tu consumo de energía por hora, permitiendo a las empresas tomar decisiones informadas y optimizar su uso de energía de manera eficiente.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-[#6366f1] to-[#6366f160] py-3 px-4 mx-3 rounded-md"
        >
          Comienza gratis
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-[#6366f1] shadow-sm shadow-[#6366f180]-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-[#6366f1] shadow-sm shadow-[#6366f180]-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
