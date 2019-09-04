import React from "react"

const NameField = ({ id, required, label, format, formId }) => (
  <label>
    {label} <input type="text" required={required} name={`${formId}_${id}`} />
  </label>
)
const EmailField = ({ id, required, label, formId }) => (
  <label>
    {label} <input type="email" required={required} name={`${formId}_${id}`} />
  </label>
)
const TextField = ({ id, required, label, formId }) => (
  <label>
    {label} <input type="text" required={required} name={`${formId}_${id}`} />
  </label>
)
const NumberField = ({ id, required, label, formId }) => (
  <label>
    {label} <input type="number" required={required} name={`${formId}_${id}`} />
  </label>
)

const TextareaField = ({ id, required, label, formId }) => (
  <label>
    {label} <textarea required={required} name={`${formId}_${id}`} />
  </label>
)

const SelectField = props => {
  const { label, required, id, choices, formId } = props
  return (
    <label>
      {label}{" "}
      <select required={required} name={`${formId}_${id}`}>
        {Object.keys(choices).map((key, i) => {
          const choice = choices[key]
          return (
            <option key={i} value={i}>
              {choice.label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

const RadioField = props => {
  const { label, required, id, choices, formId } = props
  return (
    <>
      <label>{label}</label>
      {Object.keys(choices).map((key, i) => {
        const choice = choices[key]
        return (
          <label key={i}>
            <input
              type="radio"
              name={`${formId}_${id}`}
              value={i}
              required={required}
            />{" "}
            {choice.label}
          </label>
        )
      })}
    </>
  )
}
const CheckboxField = props => {
  const { label, required, id, choices, formId } = props
  return (
    <>
      <label>{label}</label>
      {Object.keys(choices).map((key, i) => {
        const choice = choices[key]
        return (
          <label key={i}>
            <input
              type="checkbox"
              // value={i}
              name={`${formId}_${id}_${i + 1}`}
              // required={required}
            />{" "}
            {choice.label}
          </label>
        )
      })}
    </>
  )
}

const FormFields = props => {
  const postContent = JSON.parse(props.postContent)
  const formId = postContent.id
  return Object.keys(postContent.fields).map((key, i) => {
    const field = postContent.fields[key]

    return (
      <p key={i}>
        {field.type === "name" && <NameField {...field} formId={formId} />}
        {field.type === "email" && <EmailField {...field} formId={formId} />}
        {field.type === "text" && <TextField {...field} formId={formId} />}
        {field.type === "textarea" && (
          <TextareaField {...field} formId={formId} />
        )}
        {field.type === "select" && <SelectField {...field} formId={formId} />}
        {field.type === "radio" && <RadioField {...field} formId={formId} />}
        {field.type === "checkbox" && (
          <CheckboxField {...field} formId={formId} />
        )}
        {field.type === "gdpr-checkbox" && (
          <CheckboxField {...field} formId={formId} />
        )}
        {field.type === "number" && <NumberField {...field} formId={formId} />}
      </p>
    )
  })
}

export default FormFields
