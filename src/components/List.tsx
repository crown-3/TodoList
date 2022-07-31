import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IItem } from "./Interface";
import Item from "./Item";

export default function List() {
  const date = useParams();
  console.log(date.Date);

  const items: IItem[] = useFetch(
    `http://localhost:3001/item?date=${date.Date}`
  );
  return (
    <div className="ListWrapWrap">
      <div className="ListWrap">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
