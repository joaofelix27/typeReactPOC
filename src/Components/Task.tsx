import { Tasks } from "./Tasks";
import { useEffect, useState } from "react";

export default function Task({ tasks,children }: { tasks:Tasks[],children: Tasks }) : JSX.Element {
   const [isChecked, setIsChecked] = useState<boolean>(children?.complete);
  return (
    <label className="taskContainer">
      <input type="checkbox" checked={isChecked}  onChange={() => {
         setIsChecked(!isChecked)
;         children.complete=!isChecked;
         localStorage.setItem("Tasks", JSON.stringify(tasks))
      }} />
      <li> {children.title} </li>
    </label>
  );
}
