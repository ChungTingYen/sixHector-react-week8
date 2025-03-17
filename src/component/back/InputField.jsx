import PropTypes from "prop-types";
const InputField = (props) => {
  const { label, name, type, value, onChange, checked } = props;
  return (
    <>
      {type === "checkbox" ? (
        <>
          <input
            name={name}
            id={name}
            type={type}
            className={type === "checkbox" ? "form-checkbox" : "form-control"}
            checked={type === "checkbox" ? checked : undefined}
            value={type === "checkbox" ? undefined : value}
            onChange={onChange}
          />
          <label htmlFor={name} className="form-label text-primary  fw-bold">
            {label}
          </label>
          <span
            className={
              !checked ? "text-danger fw-bold" : "text-primary fw-bold"
            }
          >
            目前狀態:{checked ? "已付款" : "未付款"}
          </span>
        </>
      ) : (
        <>
          <label htmlFor={name} className="form-label text-primary fw-bold">
            {label}
          </label>
          <input
            name={name}
            id={name}
            type={type}
            className={type === "checkbox" ? "form-checkbox" : "form-control"}
            checked={type === "checkbox" ? value : undefined}
            value={type === "checkbox" ? undefined : value}
            onChange={onChange}
          />
        </>
      )}
    </>
  );
};
InputField.propTypes = {
  label:PropTypes.string,
  name:PropTypes.string, 
  type:PropTypes.string, 
  value:PropTypes.string,
  onChange:PropTypes.func,
  checked: PropTypes.oneOfType([
    PropTypes.bool, 
    PropTypes.number, 
  ])// 如果必須傳入這個屬性
 
};
export default InputField;
