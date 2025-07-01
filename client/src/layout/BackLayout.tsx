import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

export const BackLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="p-4">
        <button
          className="btn btn-ghost transition-transform duration-200 hover:-translate-x-1"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
