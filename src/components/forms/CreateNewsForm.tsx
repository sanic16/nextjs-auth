"use client";
import { useFormState } from "react-dom";
import "./createNewsForm.css";
import { createNewsAction } from "@/actions/news";

const CreateNewsForm = () => {
  const [state, formAction] = useFormState(createNewsAction, { errors: [] });

  return (
    <div className="form__wrapper">
      <div style={{ width: "50%" }}>
        <h1>Create News</h1>
        <form action={formAction}>
          <div className="form__errors">
            {state.errors && <p>{state.errors.join(",")}</p>}
          </div>
          <div className="form__control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div className="form__control">
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" rows={5}></textarea>
          </div>
          <div className="form__control">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
          <div className="form__control">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />
          </div>
          <div className="form__actions">
            <button className="btn white" type="reset">
              Clear
            </button>
            <button className="btn success" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsForm;
