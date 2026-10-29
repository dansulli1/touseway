import { useState } from "react";

export default function Form({ intro, fields, submitLabel = "Send", success }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="success">
        <h3>Thank you.</h3>
        <p>{success}</p>
      </div>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      {intro ? <p>{intro}</p> : null}
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          {field.type === "textarea" ? (
            <textarea name={field.name} required={field.required} />
          ) : field.type === "select" ? (
            <select name={field.name} required={field.required} defaultValue="">
              <option value="" disabled>Choose one</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input name={field.name} type={field.type || "text"} required={field.required} />
          )}
        </label>
      ))}
      <button className="btn" type="submit">{submitLabel}</button>
    </form>
  );
}
