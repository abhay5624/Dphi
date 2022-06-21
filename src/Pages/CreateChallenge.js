import React from "react";
import { useState, useRef } from "react";
import Icon from "../assets/icons/bxs_cloud-upload.svg";
import imageIcon from "../assets/icons/bi_image-fill.svg";
import RightIcon from "../assets/icons/Rightarrow.svg";
import CalIcon from "../assets/icons/uil_calender.svg";
import { useNavigate } from "react-router";
const CreateChallenge = ({ setnewChallenge, Editchllg, setEditchllg }) => {
  const navigate = useNavigate();
  const first = useRef();
  const [Image, setImage] = useState(false);
  var mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const RemoveImageHandler = () => {
    first.current.src = Icon;
    first.current.parentElement.className = "uploadText";
    setImage(false);
  };
  const DragHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "upload";
  };
  const DropHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (fileList[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        first.current.src = e.target.result;
        setImage(true);
        first.current.parentElement.className = "textuploaded";
      };
      reader.readAsDataURL(fileList[0]);
    }
  };
  const dateobj = (e) => {
    const date = e;
    const dayindex = date.indexOf("th");
    const Day = date.slice(0, dayindex);
    const monthsinword = date.slice(dayindex + 3, date.indexOf("'"));
    const Month = mL.indexOf(monthsinword);
    const Year = date.slice(date.indexOf("'") + 1, date.indexOf("'") + 3);
    let Hour = parseInt(date.slice(date.indexOf("'") + 4, date.indexOf(":")));
    const isAm = date.slice(date.indexOf(":") + 4, date.indexOf(":") + 6);
    if (isAm !== "Am") {
      Hour = Hour + 12;
    }
    return {
      Day: parseInt(Day),
      Month: Month,
      Year: parseInt(Year),
      Hour: Hour,
      isAm: isAm,
    };
  };
  const createChallengeHandler = (e) => {
    e.preventDefault();
    const array = [...e.target.form.elements];
    const Startdate = dateobj(array[1].value);
    const Enddate = dateobj(array[2].value);
    const image = first.current.src;
    const myPromise = new Promise((resolve, reject) => {
      const editedcllg = {
        id: Math.random(),
        img: image,
        Tag: array[4].value,
        Title: array[0].value,
        StartIn: {
          Day: Startdate.Day,
          Month: Startdate.Month,
          Year: Startdate.Year,
          Time: Startdate.Hour,
        },
        EndIn: {
          Day: Enddate.Day,
          Month: Enddate.Month,
          Year: Enddate.Year,
          Time: Enddate.Hour,
        },
        descpibtin: array[3].value,
        overview: [
          ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis incidunt esse magnam dolorem, alias dolores unde ex veritatis animi mollitia temporibus porro. Blanditiis similique neque quos perferendis tempora accusamus sit!`,
          `      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis incidunt esse magnam dolorem, alias dolores unde ex veritatis animi mollitia temporibus porro. Blanditiis similique neque quos perferendis tempora accusamus sit!`,
          `      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis incidunt esse magnam dolorem, alias dolores unde ex veritatis animi mollitia temporibus porro. Blanditiis similique neque quos perferendis tempora accusamus sit`,
        ],
      };
      console.log(editedcllg);
      resolve(editedcllg);
    });
    myPromise
      .then((value) => {
        if (Editchllg) {
          console.log(value);
          setnewChallenge([...Editchllg, value]);
          setEditchllg([...Editchllg, value]);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="ChllgDetail">
      <div className="DetailHero">
        <h2>Challenge Details</h2>
      </div>
      <div className="DetailForm">
        <form>
          <p>Challenge Name</p>
          <input type="text" name="ChallName" id="ChallName" />
          <p>Start Date</p>
          <label htmlFor="StartDate">
            <img src={CalIcon} alt="Icon" />
          </label>
          <input
            type="text"
            name="StartDate"
            id="StartDate"
            placeholder="Add Start Date"
          />
          <p>End Date</p>
          <label htmlFor="EndDate">
            <img src={CalIcon} alt="Icon" />
          </label>
          <input
            type="text"
            name="EndDate"
            id="EndDate"
            placeholder="Add End Date"
          />
          <p>Description</p>
          <textarea
            name="Description"
            id="Description"
            cols="30"
            rows="10"
          ></textarea>
          <div className="inputimage">
            <p>Image</p>
            <div
              className="Dropdown"
              onDragOver={(e) => {
                DragHandler(e);
              }}
              onDrop={(e) => {
                DropHandler(e);
              }}
            >
              <div className="uploadText">
                {!Image && <p>upload</p>}
                <img src={Icon} ref={first} alt="" />
                {Image && (
                  <div
                    className="changeImage"
                    onClick={() => {
                      RemoveImageHandler();
                    }}
                  >
                    <img src={imageIcon} alt="" /> <p>change image</p>{" "}
                    <img src={RightIcon} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <p>Level</p>
          <select name="level" id="level" defaultValue={"Easy"}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <br />
          <input
            type="submit"
            value="Save Changes"
            className="Submitbttn"
            onClick={(e) => {
              createChallengeHandler(e);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;