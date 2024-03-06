import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function CreateApi() {
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((resdata) => {
        if (resdata === "Success") {
            alert("Sucess")
            console.log(resdata)
            navigate('/')
        }
        console.log('dff',resdata)
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <div className=" flex  flex-col w-full h-full mt-10 mb-5 lg:w-5/6 shadow-2xl rounded-3xl bg-yellow-200">
        <textarea
          className="w-full h-5/6  rounded-3xl p-5 mt-5 bg-yellow-200 overflow-y-auto focus:ring-0 "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Today Dairy"
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <div className="flex w-full h-14 justify-between items-end pl-10 pr-10">
          <div className="">
            {/* <button>B</button>
            <button>I</button>
            <button>U</button>
            <button></button>
            <button></button> */}
          </div>
          <button
            className="bg-sky-300 p-2 rounded-2xl"
            onClick={() => CreateApi()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
