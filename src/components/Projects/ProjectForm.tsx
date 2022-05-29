import React, { useState } from "react";
import { IconContext } from "react-icons";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { DatePickerComp } from "./DatePicker";
import { useQueryClient } from "react-query";
import uniqid from "uniqid";
import { User } from "firebase/auth";

interface ProjectInput {
  title: String;
  desc: String;
  frequency: string;
  type: string;
  quotation: string;
}

interface ProjectError {
  name: string;
  message: string;
}

interface ProjectValidate {
  input: ProjectInput;
  error: ProjectError;
  setError: React.Dispatch<React.SetStateAction<ProjectError>>;
}

interface ProjectsFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  user?:User|null
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ open, setOpen,user }) => {
  // const [valid, setValid]= useState({message:"blank",save:'blank'})
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [calOpen, setCalOpen] = useState<boolean>(false);
  const [error, setError] = useState<ProjectError>({ name: "", message: "" });
  const [input, setInput] = useState<ProjectInput>({
    title: "",
    desc: "",
    frequency: "once",
    type: "",
    quotation: "",
  });
  
  const id = uniqid();
  const ProjectRef = doc(db, "projects", id);
  const mutationProject = useFirestoreDocumentMutation(
    ProjectRef,
    { merge: true },
    {
      onMutate: async (newProject) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("projects");
        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData("projects");
        // Optimistically update to the new value
        //@ts-ignore
        queryClient.setQueryData("projects", (old) => [...old, newProject]);
        // Return a context object with the snapshotted value
        return { previousTodos };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, context) => {
        //@ts-ignore
        queryClient.setQueryData("projects", context.previousTodos);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );


  const queryClient = useQueryClient();
  const closeCal = () => {
    setCalOpen(false);
  };
  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const validate = ({ input, error, setError }: ProjectValidate) => {
    if (input.title === "") {
      setError({ name: "title", message: "Project title cannot be blank" });
      return false;
    }
    if (input.desc === "") {
      setError({ name: "desc", message: "please add a bief desciption" });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();


    const item = {
      id,
      title: input.title,
      desc: input.desc,
      timestamp: serverTimestamp(),
      details: {
        addedon: new Date(),
        deadline: selected ? selected : null,
        addedBy:user?.uid,
        status: "pending",
        frequency: input.frequency,
        type: input.type,
        quotation: input.quotation,
      },
    };

    if (validate({ input, error, setError })) {
      mutationProject.mutate(item);
      setOpen(false);
    }
  };

  return (
    <div className=" w-full flex flex-col ">
      <IconContext.Provider value={{ size: "30px" }}>
        <div
          className="fixed top-0 bottom-0 h-full w-full bg-slate-900 z-30  opacity-40 "
          onClick={() => {
            //  setOpen(!open)
            //console.log("hey")
          }}
        >
          yy
        </div>

        <div className="Project-form-container">
          <form className=" min-w-[60%] min-h-[80%] h-fit w-[90%] 
          flex flex-col md:flex-col justify-center  items-center">
            {/* title and desc input section */}
            <div className="h-[80%]  w-[100%] flex flex-col md:flex-row justify-center 
             items-center ">
              <div className=" w-[100%] h-[100%] flex flex-col items-center justify-start">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-input p-2 w-[100%] m-rounded-md "
                  id="title"
                  onChange={handleChange}
                  onClick={() => closeCal()}
                />
                {error && error.name === "title" ? (
                  <div className="Project-form-error">{error.message}</div>
                ) : null}
                <textarea
                  placeholder="Desc"
                  className="form-input h-[60%] md:min-h-[60%] m-2 md:p-2 w-[100%] rounded-md "
                  id="desc"
                  onChange={handleChange}
                  onClick={() => closeCal()}
                />
                {error && error.name === "desc" ? (
                  <div className="Project-form-error">{error.message}</div>
                ) : null}
              </div>
              <div className="flex  flex-col w-fit h-fit m-2">
                <DatePickerComp
                  selected={selected}
                  setSelected={setSelected}
                  open={calOpen}
                  setOpen={setCalOpen}
                />
              </div>
            </div>

            {/* select boxes section */}
            <div className="h-[15%]  w-fit[100%] flex flex-row justify-center  items-center m-2">
              {/* secect Project frecuency */}
              <select
                placeholder="frequency"
                className="form-select p-1 mx-1 md:p-2   rounded-md bg-slate-200"
                id="frequency"
                onChange={handleChange}
              >
                <option value={"once"}>select repeat frequency</option>
                <option value={"yearly"}>Yearly</option>
                <option value={"monthly"}>Monthly</option>
                <option value={"weekly"}>Weekly</option>
              </select>
              {error && error.name === "frequency" ? (
              <div className="Project-form-error">{error.message}</div>
            ) : null}
            </div>

            {/* attch url section */}
            <div className="h-[15%]  w-fit[100%] flex flex-col justify-center  items-center m-2">
              <label className="text-white text-sm">
                link google doc with qutation below
              </label>
              <input
                type="url"
                placeholder="enter google doc link"
                className="form-input  w-[100%] m-rounded-md "
                id="quotation"
                onChange={handleChange}
                onClick={() => closeCal()}
              />
            </div>

            {mutationProject.isError && <p>{mutationProject.error.message}</p>}
          </form>

          <button
            disabled={mutationProject.isLoading}
            className="bg-slate-400 text-slate-100 px-5 py-2 
             rounded-md mt-2 hover:bg-slate-900 "
            onClick={(e) => handleSubmit(e)}
          >
            add
          </button>
        </div>
      </IconContext.Provider>
    </div>
  );
};
