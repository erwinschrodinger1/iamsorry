import "./App.sass";
import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./config/firebaseConfig";
function App() {
  const name = "Nirjal";
  const [reason, setReason] = useState("");
  const [clickableP2, setclickableP2] = useState(false);
  const [clickedP2, setClickedP2] = useState(false);
  const [clickableP3, setclickableP3] = useState(false);
  const [clickedP3, setClickedP3] = useState(false);

  const [margin, setMargin] = useState(0);
  const [margin1, setMargin1] = useState(0);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  return (
    <div className="App">
      <div className="page">
        <h1>
          I am sorry, <br />
          <span style={{ fontSize: "12vh" }}>{name}</span>
        </h1>
      </div>
      <div className="page">
        <h2>Why are you Sad?</h2>
        <input
          type={"text"}
          placeholder="Please Write a reason here"
          onChange={(e) => {
            if (reason.length > 200) {
              setclickableP2(true);
            } else {
              setclickableP2(false);
            }
            setReason(e.target.value);
          }}
        />
        <button
          onClick={async (e) => {
            e.preventDefault(e);
            if (!clickableP2) {
              let random = Math.floor(Math.random() * 21) - 10;
              if (Math.abs(margin - random) < 15) {
                return setMargin(3 * random);
              }
              console.log(margin);
              return setMargin(random);
            }
            try {
              await addDoc(collection(db, "reason"), {
                reason: reason,
              });
              alert("Nice");
              return setClickedP2(true);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }}
          style={{
            background: `${clickableP2 ? "green" : "white"}`,
            color: `${clickableP2 ? "white" : "black"}`,
            position: "relative",
            left: `${margin}%`,
            transition: "all 0.2s ease-in-out",
          }}
        >
          Submit
        </button>
        <p>
          Please write the reason and click submit to continue.
          <br /> Reason should be of atleast 200 letter
        </p>
        {clickedP2 ? <p>Scroll down</p> : null}
      </div>
      {clickedP2 ? (
        <div className="page">
          <h1>You are not sad now right ?</h1>
          <input
            placeholder="Please type yes !!"
            onChange={(e) => {
              if (e.target.value.toUpperCase() === "YES") {
                setclickableP3(true);
              } else {
                setclickableP3(false);
              }
              setReason(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (!clickableP3) {
                let random = Math.floor(Math.random() * 21) - 10;
                if (Math.abs(margin1 - random) < 15) {
                  return setMargin1(3 * random);
                }
                console.log(margin1);
                return setMargin1(random);
              }
              return setClickedP3(true);
            }}
            style={{
              background: `${clickableP3 ? "green" : "white"}`,
              color: `${clickableP3 ? "white" : "black"}`,
              position: "relative",
              left: `${margin1}%`,
              transition: "all 0.1s ease-in-out",
            }}
          >
            Submit
          </button>
          <p>Please type and click submit to continue.</p>
          {clickedP3 ? <p>Scroll down</p> : null}
        </div>
      ) : null}
      {clickedP3 ? (
        <div className="page">
          <h1>
            Thank You <br />
            {name}
          </h1>
        </div>
      ) : null}
    </div>
  );
}

export default App;
