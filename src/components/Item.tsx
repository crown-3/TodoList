import { ReactComponent as DeleteSvg } from "../assets/delete_outline_black.svg";
import { ReactComponent as CheckedSvg } from "../assets/checkbox_white_checked.svg";
import { ReactComponent as BlankCheckboxSvg } from "../assets/checkbox_white_blank.svg";
import { useState } from "react";
import { IItem } from "./Interface";

interface IProps {
  item: IItem;
}

export default function Item({ item: i }: IProps) {
  const [item, setItem] = useState(i);
  const [isDone, setIsDone] = useState(item.isDone);

  const toggleDone = () => {
    // setIsDone(!isDone);
    fetch(`http://localhost:3001/item/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) setIsDone(!isDone);
      else console.error("error!");
    });
  };

  const del = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`http://localhost:3001/item/${item.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) setItem({ ...item, id: 0 });
      });
    }
  };

  if (item.id === 0) return null;

  return (
    <div className="List">
      <span className="ListContent">
        <div className="Check" onClick={toggleDone}>
          {isDone ? <CheckedSvg /> : <BlankCheckboxSvg />}
        </div>
        <div className="Content">{item.content}</div>
      </span>
      <div className="DeleteSvg" onClick={del}>
        <DeleteSvg />
      </div>
    </div>
  );
}
