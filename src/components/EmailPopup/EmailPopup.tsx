import { useContext, useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MarketContext from "../../context/MarketContext";
import { api } from "../../lib/axios";
import styles from "./EmailPopup.module.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import PropTypes from "prop-types";
import { EmailPopup } from "../../types/EmailPopupProps";
import { Product } from "../../types/CartPopupProps";


interface EmailPopupProps {
  onClose: () => void;
}


interface MarketContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  reset: () => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ onClose }) => {
  const { products, reset } = useContext<MarketContextType>(MarketContext);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!email) return;
    setIsLoading(true);

    try {
      const response = await api.post<{ uuid_user: string }>("/marketplace", { 
        email, 
        produtos: products 
      });
      toast.success("Items adicionado ao email");

      reset();
      navigate(`/market/user/${response.data.uuid_user}/pagamentos`);
    } catch (err: any) {
      toast.error(err.response?.data || "Erro ao adicionar itens ao email");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div>
      <div className={styles.popupOverlay} onClick={handleClickOutside}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className={styles.popup}>
            <h3>Insira seu email</h3>
            <p>
              Para confirmar a compra,{" "}
              <strong>
                é necessário um e-mail que foi utilizado na inscrição
              </strong>{" "}
              do VI Sercomp.
            </p>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleConfirm}>Confirmar</button>
          </div>
        )}
      </div>
    </div>
  );
};

EmailPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EmailPopup;
