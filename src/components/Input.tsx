import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NavSvg } from "../assets/navigate_next_black.svg";
import { ReactComponent as SaveSvg } from "../assets/save_black.svg";
import useFetch from "../hooks/useFetch";
import { IDate, IItem } from "./Interface";
import Item from "./Item";
export default function Input() {
  const items: IItem[] = useFetch(`http://localhost:3001/item`);
  const date: IDate[] = useFetch(`http://localhost:3001/date`);
  const navigate = useNavigate();
  // console.log(date);
  //버튼 빠바바박 누르면 여러번 포스트되는 버그 방지
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value == "") {
      alert("Empty string error");
    } else if (!isLoading && inputRef.current) {
      setIsLoading(true);
      fetch(`http://localhost:3001/item/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: 1,
          content: inputRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료되었습니다!");
          setIsLoading(false);
          window.location.reload();
        } else console.error("error!");
      });
    }
  };

  return (
    <>
      <div className="ListWrapWrap">
        <div className="ListWrap">
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </div>
      <form className="InputWrap" onSubmit={onSubmit}>
        <div className="DateWrapWrap">
          <div className="DateWrap">
            <div className="GoLeftSvg">
              <NavSvg />
            </div>
            <input className="Date" defaultValue="1" placeholder="Date" />
            <div className="GoRightSvg">
              <NavSvg />
            </div>
          </div>
        </div>
        <textarea
          className="TodoInput"
          placeholder="Enter your TODOs here..."
          ref={inputRef}
        ></textarea>
        <div className="SaveSvgWrap">
          <button className="SaveSvg">
            <SaveSvg />
          </button>
        </div>
      </form>
    </>
  );
}
