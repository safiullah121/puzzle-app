import React, { useState, useRef, useEffect } from "react";

export default function Header() {
  const [numberArr, setNumberArr] = useState([]);
  const [numbers, setNumbers] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const newDivRef = useRef(null);
  const input = useRef(null);
  const changeHandler = (e) => {
    setNumbers(e.target.value);
  };
  const inputValue = localStorage.getItem("inputValue");
  useEffect(() => {
    if (inputValue) {
      setNumberArr(JSON.parse(inputValue));
    }
  }, []);

  useEffect(() => {
    const storedNumber = localStorage.getItem("number");
    if (storedNumber) {
      setNumberArr(JSON.parse(storedNumber));
    }
  }, []);

  useEffect(() => {
    setIsAscending(numberArr.length > 0 && checkAscendingOrder(numberArr))
  }, [numberArr]);

  const squaredVal = Math.pow(Number(numbers), 2);
  const newNumbers = Array.from({ length: squaredVal }, (_, index) => index + 1);
  const shuffleArray = (array) => {
    array.sort(() => Math.random() -0.5);
  };
  shuffleArray(newNumbers);
  const clickHandler = (event) => {
    event.preventDefault();
    if (numbers >=2 && numbers <= 12) {
      setNumberArr(newNumbers);
      localStorage.setItem("number", JSON.stringify(newNumbers));
      setNumbers(numbers);
      localStorage.setItem("inputValue", JSON.stringify(numbers));
    } else if (numbers < 2 || numbers > 12) {
      alert("Value must be between 2 and 12");
    }
  };

  const dragging = (e, number, index) => {
    e.dataTransfer.setData("text/plain", number.toString());
    console.log();
  };

  const draggingOver = (e) => {
    e.preventDefault();
  };

  const drop = (e, number, index) => {
    e.preventDefault();
    const draggedNumber = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedNumberArr = [...numberArr];
    updatedNumberArr[index] = draggedNumber;
    updatedNumberArr[numberArr.indexOf(draggedNumber)] = number;
    setNumberArr(updatedNumberArr);
    localStorage.setItem("number", JSON.stringify(updatedNumberArr));
  };

  const checkAscendingOrder = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  };

  const handleOkClick = () => {
    localStorage.removeItem('number')
    localStorage.removeItem('inputValue')
    setIsAscending(false);
    setNumberArr([]);
    setNumbers("");

  };
  console.log(numbers)
  const inputVal = JSON.parse(inputValue);

  return (
    <div className="m-auto max-w-[1440px]" id="container">
      <div className="hidden  grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10  grid-cols-11 grid-cols-12"></div>
      <div className="middle bg-red-300">
        <input
          className="w-[180px]"
          ref={input}
          type="number"
          value={numbers}
          onChange={changeHandler}
          min={2}
          max={12}
        />
        <button className="" onClick={clickHandler}>
          Submit
        </button>
      </div>

      {isAscending ? (
        
      <div className="congratulation mx-auto my-[150px] pt-[40px]  h-[300px] w-[800px] text-center flex justify-center item-center flex-col font-bold" id="cong">
      <p className="text-white text-5xl">Congratulations! You have done it.</p>
      <button className="ok  h-[50px] w-[100px] mx-auto  my-[40px] bg-white text-black hover:bg-slate-400" onClick={handleOkClick}>OK</button>
    </div>
      ) : (
        <div className={`grid grid-cols-${inputVal} grid-rows-${inputVal}`}>
        {numberArr.map((number, index) => (
          <div
            key={number}
            ref={newDivRef}
            className="numberDiv bg-red-300 h-20 w-20 my-5 mx-auto cursor-move text-center flex items-center justify-center text-white text-lg "
            draggable={true}
            onDragStart={(e) => dragging(e, number, index)}
            onDragOver={draggingOver}
            onDrop={(e) => drop(e, number, index)}
          >
            {number}
          </div>
        ))}
      </div>
      )
      }
      
    </div>
  );
}
