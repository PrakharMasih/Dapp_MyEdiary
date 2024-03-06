import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CardPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    console.log('first')
  }, [updateApi]);


  function getData() {
    fetch(`http://localhost:8000/${id}`)
      .then((res) => res.json())
      .then((resdata) => setData(resdata))
      .catch((e) => console.error(e));
  }

  function updateFn() {
    setContent(data[1]);
    setToggle(true);
  }

  function updateApi() {
    fetch("http://localhost:8000", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        index: id,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((resdata) => {
        alert(resdata);
        setToggle(false);
      })
      .catch((e) => console.error(e));
  }

  function handleDelete() {
    fetch("http://localhost:8000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        id:id
      })
    })
      .then((res) => res.json())
      .then((resdata) => {
        alert(resdata)
        navigate('/home')
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="w-full h-screen">
      <div className="text-center text-2xl pt-8 pb-5 flex flex-col" name="date">
        <label htmlFor="date" className="text-sm text-stone-400">
          mm/dd/yyyy hr:min:sec AM/PM
        </label>
        {data && data[0]}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between mr-10">
          <div className="text-sm pl-10 font-semibold text-stone-600 self-center">
            My EDairy
          </div>
          {!toggle && (
            <span>
              <button
                className="border border-white bg-yellow-200 m-1 mr-3 p-1 shadow-md rounded-xl hover:bg-yellow-300 hover:shadow-yellow-200 hover:scale-105 ease "
                onClick={() => updateFn()}
              >
                Update
              </button>
              <button
                className="border border-white bg-red-400 m-1 p-1 shadow-md rounded-xl hover:shadow-red-500 hover:bg-red-500 hover:scale-105 ease"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </span>
          )}
        </div>
        {!toggle ? (
          <div className="w-auto h-full m-5 lg:m-10 whitespace-pre-line bg-gray-100">
            {data && data[1]}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center">
            <textarea
              className="w-full lg:w-5/6 h-96 rounded-3xl p-5 mt-10 border  border-gray-400 overflow-y-auto"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Today Dairy"
              name="content"
              id="content"
              cols="30"
              rows="10"
            ></textarea>
            <button
              className="border border-white w-20 bg-yellow-200 m-1 mt-5 mr-3 p-1 shadow-md rounded-xl hover:bg-yellow-300 hover:shadow-yellow-200 hover:scale-105 ease "
              onClick={() => updateApi()}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPage;
