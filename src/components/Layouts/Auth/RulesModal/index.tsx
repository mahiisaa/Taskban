import { createPortal } from "react-dom";
import Modal from "../../../Common/Modal";


const portals = document.getElementById("portals") as Element;
interface IProps {
    modal: boolean;
    setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  }
  

const RulesModal: React.FC<IProps> = ({modal,setModal}): JSX.Element => {
  const handleShowModal = () => {
    setModal(!modal);
  };

    return(
     <>
     {createPortal(
        <Modal
          style={{ padding: "24px"}}
          modal={modal}
          setModal={handleShowModal}
          hasHeader={true}
          header={{ text: "قوانین و مقررات", order: 2 }}
          hasBackIcon={false}
          backIcon={{ order: 3 }}
          hasCloseIcon={true}
          closeIcon={{ order: 1 }}
          backgroundStyle="backdrop-blur-md"
          fontSize="text-[32px]"
        >
            <div  className="w-[800px] text-base" dir="rtl">
    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.

   </p>
          <ul className="flex flex-col list-disc gap-S px-L pt-L pb-S">
            <li>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
            </li>
            <li>
             برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
            </li>
            <li>
            شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، 
            </li>
            <li>
            در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،  </li>
            <li>
            و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </li>
          </ul>
        </div>
    </Modal>,
 portals

     )}
     </>
    )
}

export default RulesModal;
