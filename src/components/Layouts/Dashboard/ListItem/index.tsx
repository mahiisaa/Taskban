import React, { useState } from "react";
import Icon from "../../../Common/Icon";
interface IProps {
    text:string,
    color:string,
    hasProject:boolean,
    
} 
const ListItem: React.FC<IProps> = ({text,color,hasProject}): JSX.Element => {
    const projects = [
        { id: 1, text: "پروژه اول" },
        { id: 2, text: "پروژه دوم" },
        { id: 3, text: "پروژه سوم" },
        { id: 4, text: "پروژه چهارم" },
      ];
    const [isOpen,setIsOpen]=useState(false)
    const toggleAccordion = () => {
       setIsOpen(!isOpen)
    };
    return(
      <li onClick={toggleAccordion} className="cursor-pointer" >
        <div className="flex justify-between flex-row-reverse p-[4px] h-[36px] mt-[16px]" >
          <div className="flex justify-between items-center">
            <div> {text}</div>
             <span
                className={`w-[20px] h-[20px] bg-${color} radius-[4px] ml-[8px] inline-block`}>
            </span>
          </div>
       {hasProject&& <Icon icon="dots" />}
      </div>
      {hasProject && (
    <ul className={`${isOpen?"block":"hidden"}`}>
           {projects.map((project) => (
              <li key={project.id}
                   className="flex justify-between flex-row-reverse p-[4px] h-[36px] pr-[30px] my-[16px]"
  >
    <div className="flex justify-between items-center">
      {project.text}
    </div>
    <Icon icon="dots" />
  </li>
))}
</ul>
)}
</li>
    )
}
export default ListItem



