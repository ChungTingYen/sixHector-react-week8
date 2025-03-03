/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { apiService } from "../../apiService/apiService";
import { registerRules } from "../../data/data";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
const Input = (props) => {
  const { label, id, name, type, placeholder, register, rules, errors } = props;
  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          className={`form-control ${errors[id] && "is-invalid"}`}
          placeholder={placeholder}
          {...register(id, rules)}
        />
        {errors[id] && (
          <p className="text-danger my-2">{errors[id]?.message}</p>
        )}
      </div>
    </>
  );
};

const CustomerInfo = (props) => {
  const { setIsLoading, setReload } = props;
  const updateToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
    reset,
    watch,
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
    checkOrder(userInfo);
  });
  const checkOrder = async (userInfo) => {
    setIsLoading(true);
    try {
      const {
        data: { total, orderId, success, message },
      } = await apiService.axiosPost(`/api/${APIPath}/order`, userInfo);
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
    <div className="my-2  row justify-content-center">
      <p className="fw-bold text-center display-6 text-primary">
        請輸入訂購人資料
      </p>
      <form className="col-md-8" onSubmit={onSubmit}>
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
          label="收件人電話"
          id="tel"
          type="tel"
          name="tel"
          placeholder="請輸入電話"
          register={register}
          rules={registerRules.tel}
          errors={errors}
        />
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
          <label htmlFor="message" className="form-label">
            留言
          </label>
          <textarea
            id="message"
            className="form-control"
            cols="20"
            rows="2"
            {...register("message")}
          ></textarea>
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-danger w-100" disabled={!isValid}>
            送出訂單
          </button>
        </div>
      </form>
    </div>
  );
};
export default CustomerInfo;
