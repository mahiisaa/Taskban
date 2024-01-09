import { useContext, useEffect } from "react";
import Icon from "../Icon/";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../Form/Button";

interface IHeader {
  text?: string;
  order: number;
}

interface ICloseIcon {
  color?: string;
  order: number;
  resetInputValue?: () => void;
}

interface IBackIcon {
  color?: string;
  order: number;
  handleBack?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface IProps extends React.PropsWithChildren {
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  hasHeader: boolean;
  header: IHeader;
  hasCloseIcon: boolean;
  closeIcon: ICloseIcon;
  hasBackIcon: boolean;
  backIcon: IBackIcon;
  hasColor?: boolean;
  coloredSquare?: string;
  style?: {};
  contentTopGap?: string;
  backgroundStyle?: string;
  fontSize?: string;
}

const Modal: React.FC<IProps> = ({
  style,
  modal,
  setModal,
  hasHeader,
  header,
  children,
  hasBackIcon,
  backIcon,
  hasCloseIcon,
  closeIcon,
  hasColor,
  coloredSquare,
  contentTopGap = " gap-XL",
  backgroundStyle,
  fontSize,
}): JSX.Element => {
  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleClose = () => {
    if (closeIcon.resetInputValue) closeIcon.resetInputValue();
    setModal(false);
  };

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {modal && (
        <div
          className={`flex items-center justify-center ${backgroundStyle} bg-modalOverlay  fixed top-0 right-0 left-0 bottom-0 z-50`}
          onClick={handleClick}
        >
          <div
            className={`dark:bg-[#323232] trans flex w-auto min-w-[30%] rounded-[12px] p-[20px] flex-col items-center bg-white ${contentTopGap}`}
            style={style}
          >
            <div
              className={`flex justify-between items-center w-full h-L ${
                hasHeader === false &&
                hasBackIcon === false &&
                hasCloseIcon === false
                  ? "hidden"
                  : ""
              }`}
            >
              <div style={{ order: backIcon.order }}>
                <Button
                  type="button"
                  className={`flex items-center w-auto h-M ${
                    hasBackIcon ? "" : "invisible"
                  }`}
                  onClick={backIcon.handleBack!}
                  hasIcon={true}
                  icon={{
                    icon: "back",
                    color: `${isDarkTheme === true ? "#bac4c8" : "#1e1e1ec4"}`,
                    size: 32,
                  }}
                />
              </div>
              <div style={{ order: header.order }}>
                <h2
                  className={`dark:text-[#bac4c8] flex items-center gap-[13px] font-extrabold text-xl text-black order-$ ${
                    hasHeader ? "" : "invisible"
                  }
                `}
                >
                  {hasHeader ? header?.text : ""}
                  {hasColor && (
                    <div
                      style={{ backgroundColor: coloredSquare }}
                      className={`w-S h-S rounded-sm`}
                    ></div>
                  )}
                </h2>
              </div>
              <div style={{ order: closeIcon.order }}>
                <Button
                  type="button"
                  className={`flex items-center w-auto h-M ${
                    hasCloseIcon ? "" : "invisible"
                  }`}
                  onClick={handleClose}
                >
                  <Icon
                    icon="close"
                    color={`${isDarkTheme === true ? "#bac4c8" : "#1e1e1ec4"}`}
                    size={32}
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-full mb[28px]">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
