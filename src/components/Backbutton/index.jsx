import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ goBack }) => {
  return (
    <div onClick={goBack} style={{ cursor: "pointer" }}>
      <FaArrowLeft />
      ຍ້ອນກັບ
    </div>
  );
};

export default BackButton;
