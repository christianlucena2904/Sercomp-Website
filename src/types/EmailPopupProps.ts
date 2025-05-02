export interface EmailPopup {
  title: string;
  message: string;
  isVisible: boolean;
}
export interface EmailPopupProps {
  onClose: () => void;
} 

