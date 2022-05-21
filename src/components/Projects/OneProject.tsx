import React from "react";
import { useLocation } from "react-router-dom";
import { ListProjectItem } from "./Project";
import { DetailsListItem } from "./ProjectListItemDetails";
import { FaRegEdit, FaSave, FaRegWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useState } from "react";
import { dynColor, justTym, toTyme } from "./projectUtil";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { doc, serverTimestamp } from "firebase/firestore";
import { User } from 'firebase/auth';

interface OneProjectProps {
user?:User|null
}
export interface item {
  title: string;
  desc: string;
  editedon: Date;
  deadline: Date | null;
  status: string;
  frequency: string | undefined;
  type?: string;
  quotation?: string;
}

export const OneProject: React.FC<OneProjectProps> = ({user}) => {
const { state } = useLocation();

  //console.log("arrived with state  == ",state)
  //@ts-ignore
  const Project = state.Project as ListProjectItem;
  //@ts-ignore
  const atheme = state.theme;
  const title = Project.title;
  const desc = Project.desc;
  const status = Project.details.status;
  const frequency = Project.details.frequency;
  const addedby = Project.details.addedBy;
  const addedon = Project.details.addedon;
  const deadline = justTym(Project.details.deadline);
  const type = Project.details.type;
  const quotation = Project.details.quotation;
  //@ts-ignore
  const id = state.id;

  //console.log("navigated with state =====",state)

  const [editing, setEditing] = useState<boolean>(false);
  //@ts-ignore
  const [selected, setSelected] = useState<Date | undefined>(deadline);
  const [calOpen, setCalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string|undefined>(atheme);
  const [input, setInput] = useState<item>({
    title: title,
    desc: desc,
    editedon: new Date(),
    deadline,
    status,
    frequency,
    type,
    quotation,
  });

  //@ts-ignore
  const handleChange = (e, vals, item) => {
    const { value } = e.target;
    setInput({ ...input, [e.target.id]: value });
  };
console.log("theme is ",theme)
  const ref = doc(db, "projects", id);
  const mutation = useFirestoreDocumentMutation(ref, { merge: true });
  const updateProject = () => {
    const item = {
      id,
      title: input.title,
      desc: input.desc,
      timestamp: serverTimestamp(),
      details: {
        editedOn: new Date(),
        editedBy: user?.displayName,
        deadline: selected ? selected : input.deadline,
        status: input.status,
        frequency: input.frequency,
        quotation: input.quotation,
      },
    };
    mutation.mutate(item);
    setTheme(dynColor(input.status))
    setEditing(false);
  };

  return (
    <div
      style={{ borderColor: theme, borderWidth: "2px", borderRadius: "5px" }}
      className="w-full  min-h-screen flex flex-col md:flex-row 
      items-center md:justify-center bg-slate-300 scroll-mt-[200px]"
    >
      <IconContext.Provider value={{ size: "30px" }}>
        <div className="fixed top-[11%] right-[3%] text-black md:right-[50%] md:top-3 z-30">
          <FaRegEdit onClick={() => setEditing(!editing)} />
        </div>

        <div className="flex flex-col p-[5%] max-h-fit w-full  md:h-[70%] items-center   
        bg-slate-300">
          <div className=" min-h-fit  w-[95%] lg:w-[50%] flex flex-col bg-slate-200">
            
            <div className=" flex w-full justify-between">
              {addedby ? (
                <div className="flex mx-2 justify-center items-center">
                  <div className="font-bold text-lg">By : </div>
                  <div>{user?.displayName}</div>
                </div>
              ) : null}

              {addedon ? (
                <div className="flex mx-2 justify-center items-center">
                  <div className="font-bold text-lg">On : </div>
                  <div>{toTyme(addedon)}</div>
                </div>
              ) : null}
            </div>
            {editing ? (
              <input
                id={"title"}
                name={"title"}
                //@ts-ignore
                onChange={(e) => handleChange(e)}
                value={input.title}
                className="border-black border-2 m-2 p-2"
              />
            ) : (
              <div className="text-3xl m-2 font-bold my-5 md:p-2">
                {input.title}
              </div>
            )}

            {editing ? (
              <textarea
                id={"desc"}
                name={"description"}
                //@ts-ignore
                onChange={(e) => handleChange(e)}
                value={input.desc}
                className="border-black border-2 m-2 my-5 p-4 
                overflox-x-hidden min-h-[230px] md:min-h-[250px] "
              />
            ) : (
              <div className="text-base m-2 overflow-x-clip md:py-4 p-2 font-bold h-[70%]">
                {input.desc}
              </div>
            )}

            {mutation.isError && <p>{mutation.error.message}</p>}
          </div>

          <div
            style={{
              borderColor: theme,
              borderWidth: "3px",
              borderRadius: "5px",
            }}
            className="m-2   w-[95%] lg:w-[50%] flex flex-col bg-slate-300"
          >
            <DetailsListItem
              from={"oneProject"}
              id={id}
              Project={Project}
              editing={editing}
              input={input}
              setInput={setInput}
              selected={selected}
              setSelected={setSelected}
              calOpen={calOpen}
              setCalOpen={setCalOpen}
              handleChange={handleChange}
              theme={theme}
              setTheme={setTheme}
            />
          </div>

          {editing ? (
            <div className=" fixed bottom-[3%] right-[5%] text-black  z-30 bg-slate-400   p-3">
              <FaSave onClick={() => updateProject()} className="mx-2" />
              <FaRegWindowClose
                onClick={() => setEditing(!editing)}
                className="mx-2"
              />
            </div>
          ) : null}
        </div>
      </IconContext.Provider>
    </div>
  );
};
