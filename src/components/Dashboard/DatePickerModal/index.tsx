import { createPortal } from "react-dom";
import Modal from "../../Common/Modal";
import DatePicker from "../../Common/DatePicker";

const portals = document.getElementById("portals") as Element;

interface IProps {
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  onChangeDate: (date) => void;
}

const DatePickerModal: React.FC<IProps> = ({ modal, setModal, onChangeDate }): JSX.Element => {
  const handleShowModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {createPortal(
        <Modal
          modal={modal}
          style={{ padding: 0 }}
          setModal={handleShowModal}
          hasCloseIcon={false}
          closeIcon={{ order: 1 }}
          hasHeader={false}
          backIcon={{ order: 2 }}
          hasBackIcon={false}
          hasColor={false}
          coloredSquare="lightgray_300"
          header={{ order: 3, text: "" }}
        >
          <DatePicker onClick={handleShowModal} onChangeDate={(date) => onChangeDate(date)}/>
        </Modal>,
        portals
      )}
    </>
  );
};

export default DatePickerModal;
