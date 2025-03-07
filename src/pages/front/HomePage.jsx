import { SwiperComponent } from '../../component/front';
export default function HomePage() {
  const product = {
    imagesUrl:[
      {
        url:"https://plus.unsplash.com/premium_photo-1664194583959-c44d377a7835?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ,content:'是不是很久沒有拿起心愛的樂器了呢?' 
      } ,
      {
        url:"https://images.unsplash.com/photo-1588450523206-e0b048d8f4d3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ,content:'是不是懷念學生時期，每天只彈一樣的樂句就很開心呢?' 
      },
      {
        url:"https://plus.unsplash.com/premium_photo-1683121629512-e1a92814f0ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ,content:'是不是懷念練團時的熱忱呢?' 
      } ,
      { url:'https://images.unsplash.com/photo-1568663041326-6348c761f7af?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',content:'進來一個簡單的樂器行吧，都可以幫你重溫喔~' }
    ]
  };
  return (
    <div className="container-fluid">
      <div
        className="position-absolute"
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1613837295512-0375f9cb6159?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center center",
          opacity: 0.2,
          zIndex: -1,
        }}
      ></div>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <div className="row justify-content-center my-auto">
          <div className="col-md-6 text-center">
            <h2>歡迎來到一個簡單的樂器行</h2>
            <p className="text-muted mb-0">
              進來看看吧~
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <SwiperComponent product={product} swiperType={0}/>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-2">
        <div className="row flex-row justify-content-between mt-4 ">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1582188886038-0359ac9d69a5?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="pic1"
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4 fw-bolder">樂器</h4>
            <p className="text-muted">
              各式各樣的樂器專賣，電吉他貝斯,木吉他貝斯,鼓類,以及各式配件
            </p>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-between mt-4 bg-light">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="pic2"
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 m-auto text-center bg-light">
            <h4 className="mt-4 fw-bolder">練團室,表演場地</h4>
            <p className="text-muted">
              練團室,表演場地預約，場地可大可小，快來預約
            </p>
          </div>
        </div>
        <div className="row flex-row justify-content-between mt-4 ">
          <div className="col-md-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1682097225321-86a911d37366?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="pic3"
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4 fw-bolder">專業課程</h4>
            <p className="text-muted">
              想學樂器卻苦無好的師資嗎?讓我們手把手堆疊起你的基礎
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
