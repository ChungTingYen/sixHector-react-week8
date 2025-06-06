import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { apiService } from "../../apiService/apiService";
import { registerRules } from "../../data/data";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
import { Link } from "react-router-dom";
import { forwardRef, } from "react";
const Input = (props) => {
  const { label, id, name, type, placeholder, register, rules, errors } = props;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`form-control ${errors?.[id] && "is-invalid"}`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && <p className="text-danger my-2">{errors[id]?.message}</p>}
    </div>
  );
};
//使用Contoller建議使用forwardRef因為field會把ref傳進來
//不然就是把ref過濾掉不傳進來
const CustomInput = forwardRef((props,ref)=>{
  const { label, type, placeholder, errors,name,onChange,onBlur,value, } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-control ${errors?.[name] && "is-invalid"}`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
      />
      {errors?.[name] && <p className="text-danger my-2">{errors[name]?.message}</p>}
    </div>
  );
});

// 定義 Input 的 propTypes
Input.propTypes = {
  label: PropTypes.string.isRequired,        // 必填，字串類型
  id: PropTypes.string.isRequired,           // 必填，字串類型
  name: PropTypes.string.isRequired,         // 必填，字串類型
  type: PropTypes.string.isRequired,         // 必填，字串類型
  placeholder: PropTypes.string,             // 選填，字串類型
  register: PropTypes.func.isRequired,       // 必填，函數類型
  rules: PropTypes.object,                   // 選填，物件類型
  errors: PropTypes.object                   // 選填，物件類型
};
CustomInput.displayName = "CustomInput";
CustomInput.propTypes = {
  label: PropTypes.string.isRequired,        // 必填，字串類型
  name: PropTypes.string.isRequired,         // 必填，字串類型
  type: PropTypes.string.isRequired,         // 必填，字串類型
  placeholder: PropTypes.string,   
  errors: PropTypes.object,  
  value:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  onBlur:PropTypes.func.isRequired
};
const CustomerInfo = (props) => {
  const { setIsLoading, setReload } = props;
  const updateToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      address: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message,
      },
    };
    console.log("userInfo,", userInfo);
    checkOrder(userInfo);
  });
  const checkOrder = async (userInfo) => {
    setIsLoading(true);
    try {
      await apiService.axiosPost(`/api/${APIPath}/order`, userInfo);
      reset();
      updateToast("填寫完成", "danger", true);
    } catch (error) {
      console.log(error);
      alert(error);
      updateToast("填寫失敗", "danger", true);
    } finally {
      setIsLoading(false);
      setReload(true);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Controller name="tel" control={control} rules={registerRules.tel}
          render={({ field })=> {
            const { ref,...rest } = field;
            return <CustomInput 
              label="收件人手機"
              type="tel"
              placeholder="請輸入手機" 
              errors={errors} 
              {...rest}
            />;
          }}/>
        <Input
          label="收件人姓名"
          id="name"
          name="name"
          type="text"
          placeholder="請輸入姓名"
          register={register}
          rules={registerRules.name}
          errors={errors}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="請輸入 Email"
          register={register}
          rules={registerRules.email}
          errors={errors}
        />
        {/* <Input
          label="收件人電話"
          id="tel"
          type="tel"
          name="tel"
          placeholder="請輸入電話"
          register={register}
          rules={registerRules.tel}
          errors={errors}
        /> */}
        <Input
          label="收件人地址"
          id="address"
          name="address"
          type="text"
          placeholder="請輸入地址"
          register={register}
          rules={registerRules.address}
          errors={errors}
        />
        
        <div className="mb-3">
          <label htmlFor="message" className="text-muted mb-0">
            備註
          </label>
          <textarea
            className="form-control"
            rows="3"
            cols="20"
            id="message"
            placeholder="留言 ... "
            {...register("message")}
          ></textarea>
        </div>
        <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
          <Link to="/cart" className="text-dark mt-md-0 mt-3 fw-bold">
            <i className="fas fa-chevron-left me-2"></i>回到購物車
          </Link>
          <button
            type="submit"
            className="btn btn-dark py-3 px-5"
            disabled={!isValid}
          >
            建立訂單
          </button>
        </div>
      </form>
    </>
  );
};
CustomerInfo.propTypes = {
  setIsLoading:PropTypes.func,
  setReload:PropTypes.func
};
export default CustomerInfo;
