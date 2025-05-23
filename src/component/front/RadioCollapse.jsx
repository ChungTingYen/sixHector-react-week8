import PropTypes, { shape } from "prop-types";
import { useRef, } from "react";
const RadioCollapse = (props) => {
  const { index, activeKey, handleToggle, title, id, contentRef, contents } = props;
  const radioRef = useRef(null);
  return (
    <div className="card rounded-0" onClick={() => radioRef.current && radioRef.current.click()}> 
      <div className={`card-header bg-white border-0 py-3 `} >
        <label className="me-3">
          <input
            type="radio"
            id={`radio-${index}`}
            name="accordion"
            className="form-check-input"
            value={index}
            checked={activeKey === index}
            onChange={ (e)=>handleToggle(e)}
            ref={radioRef}
          />
          <span className="ms-2">{title}</span>
        </label>
      </div>
      <div
        id={id}
        className="collapsible-content"
        ref={(el) => (contentRef.current[index] = el)}
      >
        {contents.length > 0 && (
          <div className="card-body bg-light ps-5 py-4">
            {contents.map((content) => (
              <div className="mb-2" key={content.id}>
                <label htmlFor={content.id} className="text-muted mb-0">
                  {content.title}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={content.id}
                  placeholder={content.placeholder}
                  defaultValue=''
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
RadioCollapse.propTypes = {
  index:PropTypes.string,
  activeKey:PropTypes.string,
  handleToggle:PropTypes.func,
  title:PropTypes.string, 
  id:PropTypes.string, 
  contentRef: PropTypes.shape({
    current: PropTypes.oneOfType([
      PropTypes.instanceOf(Element),          // 單一 DOM 節點
      PropTypes.arrayOf(PropTypes.instanceOf(Element)) // 多個 DOM 節點
    ]),
  }).isRequired,
  contents:PropTypes.arrayOf(shape({
    id: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
  })).isRequired,
};
export default RadioCollapse;