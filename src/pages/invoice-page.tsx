import { useConnectedUserStore } from "@/features/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const InvoicePage = () => {
  const { isConnected } = useConnectedUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);

  return <div className="bg-blue">invoice-page</div>;
};
