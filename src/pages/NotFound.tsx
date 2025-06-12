import React from "react";
import { Link } from "react-router-dom";
import { AuroraBackground } from "../components/aceternity/aurora-background";

const NotFound: React.FC = () => {
  return (
    <AuroraBackground className="0">
      <div className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10">
        <div className="max-w-md text-center relative z-20">
          <div className="text-6xl font-bold text-black mb-4">404</div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Página no encontrada
          </h1>
          <p className="text-lg text-black/70 mb-8">
            Lo sentimos, no pudimos encontrar la página que buscas. Es posible
            que la página haya sido movida o no exista.
          </p>
          <div className="space-y-4 relative z-30">
            <Link
              to="/"
              className="relative z-40 cursor-pointer inline-flex items-center px-6 py-3 border border-black text-base font-medium rounded-md text-white bg-black hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
            >
              ← Volver al inicio
            </Link>
            <div className="text-sm text-black/60 relative z-40">
              o{" "}
              <Link
                to="/?section=section6"
                className="text-black hover:text-black/70 font-medium cursor-pointer relative z-40"
              >
                contáctanos
              </Link>{" "}
              si necesitas ayuda
            </div>
          </div>
        </div>

        <div className="mt-16 text-center relative z-20">
          <div className="text-9xl opacity-10">🏠</div>
          <p className="text-sm text-black/60 mt-4 max-w-lg">
            "Porque yo sé los pensamientos que tengo acerca de vosotros, dice
            Jehová, pensamientos de paz, y no de mal, para daros el fin que
            esperáis." - Jeremías 29:11
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default NotFound;
