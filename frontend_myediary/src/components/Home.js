import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [diary, setDiary] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (searchDate) {
      setSearchDate(searchDate.split("-").reverse().join("/"));
      setToggle(true);
    }
    if (diary.length > 0) {
      const temp = diary.filter((curr) => curr[0] === searchDate);
      if (temp.length > 0) {
        setDiary(temp);
      }
      console.log(temp);
    }
  }, [searchDate]);

  function getApi() {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((resdata) => setDiary(resdata))
      .catch((e) => console.error(e));
  }

  return (
    <div className="w-full h-full flex flex-col bg-pack-train bg-cover bg-center bg-no-repeat ">
      <div className="self-center italic text-2xl mt-3 hover:text-teal-500">
        {" "}
        <span className="text-4xl text-red-300">W</span>ellcome To Your Personal
        Diary
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={"/create"}
          className="self-center border border-green-200 bg-green-200 ring-1 rounded-lg p-1 ml-10 hover:bg-green-300  "
        >
          Create New Diary
        </Link>
        {toggle && (
          <button
            className="border p-1 rounded-xl bg-stone-100"
            onClick={() => {
              getApi()
              setToggle(false)
            }}
          >
            Load All Date
          </button>
        )}
        <input
          className="self-center border border-blue-200 rounded-xl ring-2 mt-5 mb-3 mr-10 p-1"
          type="date"
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <div className="w-full h-full flex flex-wrap">
        {diary &&
          diary.toReversed().map((curr, i) => {
            return (
              <>
                <Link
                  key={i}
                  to={`/userdiary/${Math.abs(i - (diary.length - 1))}`}
                  className="flex justify-center text-xl bg-snow-100 border bg-yellow-100 w-full h-48 m-8 rounded-xl shadow-xl hover:shadow-2xl md:w-1/5 lg:w-1/5"
                >
                  <div className="self-center ">{curr && curr[0]}</div>
                </Link>
              </>
            );
          })}
      </div>
      <div className="font-thin self-center text-2xl italic text-stone-400 m-5">
        Developed By @prakharmasih
      </div>
    </div>
  );
};

export default Home;
