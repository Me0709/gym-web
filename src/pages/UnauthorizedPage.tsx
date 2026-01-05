import { useAuth } from "@/features/auth/hooks/useAuth";
import { Lock, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROLE_PRIORITY, DEFAULT_DASHBOARD_PATHS } from "@/config/navConfiguration";
import { type AppRole } from "@/features/auth/types/auth.types";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const primaryRole = ROLE_PRIORITY.find((role: AppRole) => user.roles.includes(role));
    const redirectPath = primaryRole ? DEFAULT_DASHBOARD_PATHS[primaryRole] : "/dashboard";
    navigate(redirectPath);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 font-sans antialiased">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 p-4 rounded-full shadow-lg">
            <Lock className="h-16 w-16 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-red-600 tracking-tight leading-tight">
          Acceso Denegado
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Lo sentimos, no tienes los permisos necesarios para ver esta página.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
          >
            <Home size={20} />
            Ir a la página de inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
