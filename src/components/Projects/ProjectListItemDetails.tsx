import React from "react";
import { DatePickerComp } from "./DatePicker";
import { ListProjectItem } from "./Project";
import { dynColor, toTyme } from "./projectUtil";
import { item } from "./OneProject";
import { useState } from "react";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

interface DetailsListProps {
  id?: string;
  from: string;
  Project: ListProjectItem;
  input: any;
  setInput: React.Dispatch<React.SetStateAction<item>>;
  editing: boolean;
  selected: Date | undefined;
  setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>;
  calOpen: boolean;
  setCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: any, vals: any, item: any) => void;
  theme:string|undefined;
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const DetailsListItem: React.FC<DetailsListProps> = ({
  id,
  Project,
  input,
 editing,
  from,
  selected,
  setSelected,
  calOpen,
  setCalOpen,
  handleChange,
  theme,
  setTheme
}) => {
  const status = input.status;
  const frequency = input.frequency;
  const deadline = Project.details.deadline;
  const editedBy = Project.details.editedBy;
  const editedOn = Project.details.editedOn;
  const approvedOn = Project.details.approvedOn;
  const fundedOn = Project.details.fundedOn;
  const doneOn = Project.details.doneOn;
  const quotation = input.quotation;

  const [approved, setapproved] = useState<boolean>(status && approvedOn);
  const [funded, setfunded] = useState<boolean>(
    approved && fundedOn !== undefined
  );
  const [done, setdone] = useState<boolean>(
    status && approvedOn && fundedOn && doneOn
  );
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [who, setWho] = useState<string>("");

  //@ts-ignore
  const ref = doc(db, "projects", id);
  const mutation = useFirestoreDocumentMutation(ref, { merge: true });

  const saveChange = (field: string) => {
    let item = {
      id,
      timestamp: serverTimestamp(),
      details: {
        approvedOn: serverTimestamp(),
        status: "pending",
        
      },
    };

    if (field === "approvedOn") {
      item = {
        id,
        timestamp: serverTimestamp(),
        details: {
          approvedOn: serverTimestamp(),
          status: "approved",
           
        },
      };
    }
    if (field === "fundedOn") {
      item = {
        id,
        timestamp: serverTimestamp(),
        details: {
          //@ts-ignore
          fundedOn: serverTimestamp(),
          status: "funded",
          
        },
      };
    }
    if (field === "doneOn") {
      item = {
        id,
        timestamp: serverTimestamp(),
        details: {
          //@ts-ignore
          doneOn: serverTimestamp(),
          status: "done",
      
        },
      };
    }

    //console.log("saving item ==== ",item)
    mutation.mutate(item);
    setTheme(dynColor(item.details.status))
  };
  const confirm = () => {
    if (who === "saveChange") {
      saveChange("approvedOn");
      setapproved(true);
      setmodalopen(false);
    }
    if (who === "fund") {
      saveChange("fundedOn");
      setfunded(true);
      setmodalopen(false);
    }
    if (who === "done") {
      saveChange("doneOn");
      setdone(true);
      setmodalopen(false);
    }
  };

  const decline = () => {
    setmodalopen(false);
  };

  const handleClick = (who: string) => {
    setmodalopen(true);
    setWho(who);
  };

  if (!Project) {
    return <div>loading details....</div>;
  }

  return (
    <div className=" flex flex-col p-1 ">
      {modalopen ? (
        <div
          className="fixed top-0 bottom-o right-0 left-0 h-screen w-screen
 bg-slate-400 flex justify-center items-center"
        >
          <div
            className="flex flex-col justify-center items-center md:h-[40%] md:w-[30%] bg-slate-500 
rounded-lg"
          >
            <div className="text-lg font-extrabold text-white">
              Confirm action
            </div>
            <div className="flex">
              <button
                onClick={() => confirm()}
                className="bg-slate-700 px-5 py-2 rounded-sm m-3 text-lg font-bold text-white"
              >
                Yes
              </button>
              <button
                onClick={() => decline()}
                className="bg-red-600 px-5 py-2 rounded-sm m-3 text-lg font-bold text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* edited tab*/}
      <div className=" flex ">
        {editedBy ? (
          <div className="Project-item-detail-item">
            <div className="label-style">Edited By : </div>
            <div>{Project.details.editedBy}</div>
          </div>
        ) : null}
        {editedOn ? (
          <div className="Project-item-detail-item">
            <div className="label-style">edited on : </div>
            <div>{toTyme(editedOn)}</div>
          </div>
        ) : null}
      </div>

      {/* status */}

      <div className=" flex flex-wrap mb-2 bg-slate-400">
        {/* status tab */}
        <div>
          {status ? (
            <div className="Project-item-detail-status">
              <div className="label-style">Status :</div>
              <div>{status}</div>
            </div>
          ) : null}
        </div>

        {/* approvr on */}
        <div>
          {approved ? (
            <div className="Project-item-detail-status">
              <div className="label-style">Approved On:</div>
              <div> {toTyme(approvedOn)}</div>
            </div>
          ) : (
            <button
              onClick={() => handleClick("saveChange")}
              className="bg-orange-700 hover:bg-orange-600 p-1 rounded-md text-white mx-1"
            >
              Approve
            </button>
          )}
        </div>

        {/* funded on , only show if approved*/}

        {approved ? (
          <div>
            {funded ? (
              <div className="Project-item-detail-status">
                <div className="label-style">Funded On:</div>
                <div> {toTyme(fundedOn)}</div>
              </div>
            ) : (
              <button
                onClick={() => handleClick("fund")}
                className="bg-orange-700 hover:bg-orange-600 p-1 rounded-md 

text-white mx-1"
              >
                Fund
              </button>
            )}
          </div>
        ) : null}

        {/* done on , only show if funded*/}
        {funded ? (
          <div>
            {done ? (
              <div className="Project-item-detail-status">
                <div className="label-style">Dune On:</div>
                <div> {toTyme(doneOn)}</div>
              </div>
            ) : (
              <button
                onClick={() => handleClick("done")}
                className="bg-orange-700 hover:bg-orange-600 p-1 rounded-md text-white mx-1"
              >
                Mark Done
              </button>
            )}
          </div>
        ) : null}

        {/* end of status */}
      </div>

      {/* frquency ,editable field */}
      <div className=" flex mb-2">
        {frequency ? (
          <div className="Project-item-detail-freq">
            <div className="w-max px-1 bg-slate-500 flex items-center text-white font-bold rounded-sm">
              Frequency{" "}
            </div>
            {editing ? (
              <select
                placeholder="frequency"
                className="mx-1 md:p-2 w-[50%]  rounded-md bg-slate-200"
                id="frequency"
                //@ts-ignore
                onChange={handleChange}
              >
                <option value={"once"}>select repeat frequency</option>
                <option value={"yearly"}>Yearly</option>
                <option value={"monthly"}>Monthly</option>
                <option value={"weekly"}>Weekly</option>
              </select>
            ) : (
              <div className="w-max p-2 text-md font-bold"> {frequency}</div>
            )}
          </div>
        ) : null}


      </div>
      {/* deadline date/date picker, editable field*/}
      {deadline !== null && deadline ? (
        <div className="Project-item-detail-item ">
          {!editing ? <div className="label-style">Deadline : </div> : null}
          {editing ? (
            <DatePickerComp
              selected={selected}
              setSelected={setSelected}
              open={calOpen}
              setOpen={setCalOpen}
            />
          ) : (
            <div>{toTyme(deadline)}</div>
          )}
        </div>
      ) : null}

      {quotation||editing ? (
        <div className=" w-full p-2 text-md font-bold">
          {editing ? (
            <input
              id={"quotation"}
              name={"quotation"}
              type="url"
              //@ts-ignore
              onChange={(e) => handleChange(e)}
              value={input.quotation}
              className="border-black border-2 m-2 px-2 w-full"
            />
          ) : (
            <a
              className="outline-1 outline-black"
              href={quotation}
              target="_blank"
              rel="noreferrer"
            >
              View the quote
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
};
