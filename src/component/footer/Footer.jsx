export default function Footer() {
  return (
    <>
      <div className="bg-light py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
            <p className="mb-0 fw-bold">不想錯失最新商品與折扣嗎?來訂閱電子報吧</p>
            <div className="input-group w-md-50 mt-md-0 mt-3">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder=""
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                >
                  輸入Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
            <a className="text-white h4" href="#">
            一個簡單的樂器行
            </a>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
            <div className="mb-md-0 mb-1">
              <p className="mb-0">02-3456-7890</p>
              <p className="mb-0">service@mail.com</p>
            </div>
            <p className="mb-0">此網頁僅為學習使用，全部圖片版權皆為<span>https://unsplash.com</span></p>
          </div>
        </div>
      </div>
    </>
  );
}
