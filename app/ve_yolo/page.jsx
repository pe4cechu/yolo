"use client";
import React from "react";
import banner from "../public/images/banner1.png";

const InfoWall = () => {
  return (
    <div className="relative z-0">
      <img className="h-96 w-full object-cover" src={banner.src} alt="" />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <h1 className="text-white text-6xl font-poppins-extra-bold">
          VỀ GREENLY
        </h1>
      </div>
    </div>
  );
};

const Track = () => {
  return (
    <section>
      <div className="container text-black mx-auto px-5 py-10 md:py-14">
        {/* main  */}
        {/* Heading  */}
        <h1 className="text-center text-3xl font-poppins-bold mb-5">
          Nơi cung cấp các thực phẩm chất lượng
        </h1>

        {/* para  */}
        <h2 className="text-left text-2xl mb-7">
          <span style={{ color: "#28b14b", fontFamily: "Poppins_Bold" }}>
            Greenly
          </span>{" "}
          là nền tảng liên kết và giới thiệu các sản phẩm thực phẩm chất lượng
          từ các cửa hàng uy tín. Chúng tôi cam kết mang đến cho bạn những lựa
          chọn tốt nhất, đảm bảo sức khỏe và sự hài lòng.
        </h2>

        {/* para  */}
        <p className="text-left text-gray-600 mb-12">
          Thời gian hỗ trợ: 7:00 - 23:00 hàng ngày
        </p>

        <div className="flex flex-wrap -m-4 text-center">
          {/* Track 1 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <h2 className="title-font font-poppins-semi-bold text-lg">
                Sản phẩm chất lượng cao
              </h2>
              <p className="leading-relaxed">
                Greenly giới thiệu các sản phẩm thực phẩm được chọn lọc kỹ lưỡng
                từ các cửa hàng uy tín, đảm bảo chất lượng và an toàn.
              </p>
            </div>
          </div>

          {/* Track 2 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
              <h2 className="title-font font-poppins-semi-bold text-lg">
                Đa dạng sản phẩm
              </h2>
              <p className="leading-relaxed">
                Từ thực phẩm hữu cơ, đồ ăn nhẹ đến các sản phẩm chế biến sẵn,
                Greenly giúp bạn dễ dàng tìm thấy sản phẩm phù hợp.
              </p>
            </div>
          </div>

          {/* Track 3 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h2 className="title-font text-lg font-poppins-semi-bold">
                Tiết kiệm thời gian tối đa
              </h2>
              <p className="leading-relaxed">
                Giúp bạn có thể tiếp cận tới những sản phẩm đã kiểm định an toàn
                và chất lượng nhất, tiết kiệm thời gian tối đa cho bạn.
              </p>
            </div>
          </div>

          {/* Track 4 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
              <h2 className="title-font font-poppins-semi-bold text-lg">
                Mức giá hợp lý
              </h2>
              <p className="leading-relaxed">
                Greenly cung cấp các sản phẩm mức giá hợp lý và phù hợp với
                khách hàng, đảm bảo giá tiền tương xứng với chất lượng sản phẩm.
              </p>
            </div>
          </div>

          {/* Track 5 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
              <h2 className="title-font font-poppins-semi-bold text-lg">
                Cửa hàng uy tín
              </h2>
              <p className="leading-relaxed">
                Sản phẩm của Greenly đến từ các chuỗi cửa hàng uy tín. Greenly
                cam kết mọi trách nhiệm với các sản phẩm quá hạn hoặc không đảm
                bảo chất lượng.
              </p>
            </div>
          </div>

          {/* Track 6 */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-lg">
              <svg
                className="w-12 h-12 mb-3 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#28b14b"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <h2 className="title-font font-poppins-semi-bold text-lg">
                Hỗ trợ tận tâm
              </h2>
              <p className="leading-relaxed">
                Luôn đồng hành cùng khách hàng để miễn phí giải đáp mọi vấn đề
                và thắc mắc về dịch vụ hoặc về những quy trình, thực phẩm an
                toàn cho sức khỏe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <div>
      <section className="body-font mb-10">
        {/* main  */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading  */}
          <h1 className=" text-center text-3xl font-poppins-semi-bold">
            Đội ngũ phát triển: <span style={{ color: "#28b14b" }}>Nhóm 6</span>
          </h1>
          {/* para  */}
          <h2 className=" text-center text-2xl font-poppins-semi-bold mb-10">
            Thành viên nhóm:
          </h2>

          <div className="flex flex-wrap -m-4">
            {/* Testimonial 1 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/1.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Phương Minh Khang
                </h2>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/2.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Phan Thanh Bình
                </h2>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/3.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Lê Bá Tiến
                </h2>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/4.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Phan Trần Trung Nam
                </h2>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/6.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Mai Phúc Thiện
                </h2>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 object-cover object-center rounded-full inline-block bg-gray-100"
                  src="https://u.cubeupload.com/BinhDangCap/5.jpg"
                />
                <div>
                  <span
                    className="inline-block h-1 w-10 rounded"
                    style={{ backgroundColor: "#28b14b" }}
                  />
                </div>
                <h2 className="font-medium title-font tracking-wider text-sm uppercase">
                  Nguyễn Thành Phát
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const page = () => {
  return (
    <div>
      <InfoWall />
      <Track />
      <Testimonial />
    </div>
  );
};

export default page;
