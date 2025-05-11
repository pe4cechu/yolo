"use client";
import React from "react";
import Product from "../components/Product";
import { useProductContext } from "../context/ProductContext";

import Link from "next/link";
import Image from "next/image";
import chilli_sauce_banner from "../public/images/chilli_sauce_banner.jpg";
import strawberry_banner from "../public/images/strawberry_banner.jpg";
import lettuce_banner from "../public/images/lettuce_banner.jpg";
import carrot_banner from "../public/images/carrot_banner.png";

const articles = [
  {
    id: 1,
    title:
      "Tương ớt nào an toàn cho sức khỏe gia đình bạn giữa vô vàn chất phụ gia?",
    image: chilli_sauce_banner,
    description:
      "Trong nền ẩm thực phong phú và đa dạng của Việt Nam, tương ớt luôn là một gia vị không thể thiếu. Tuy nhiên, giữa vô vàn sản phẩm trên thị trường, việc chọn một loại tương ớt an toàn cho sức khỏe là điều khiến nhiều người tiêu dùng băn khoăn. Nhiều sản phẩm tương ớt hiện nay chứa các chất phụ gia nhân tạo, gây lo ngại về tác động lâu dài đến sức khỏe.",
    link: "https://chus.vn/tuong-ot-nao-an-toan-cho-suc-khoe-gia-dinh-khong-chat-phu-gia/",
  },
  {
    id: 2,
    title: "Dâu tây với lợi ích 'trên cả tuyệt vời' với sức khoẻ",
    image: strawberry_banner,
    description:
      "Dâu tây có chị chua, ngọt có thể ăn trực tiếp hoặc làm sinh tố, nước ép, kem,… trong dâu tây chứa nhiều vitamin A, B1, B2, đặc biệt là vitamin C rất cao, hơn cả cam và dưa hấu, giúp tăng sức đề kháng cho cơ thể và ngăn ngừa nhiều bệnh. Tìm hiểu rõ hơn về lợi ích của dâu tây trong bài viết sau đây.",
    link: "https://www.bachhoaxanh.com/kinh-nghiem-hay/cong-dung-tren-ca-tuyet-voi-cua-qua-dau-tay-voi-suc-khoe-1155679",
  },
  {
    id: 3,
    title:
      "Rau xà lách không chỉ làm salad mà với hàng loạt công dụng khiến bạn bất ngờ",
    image: lettuce_banner,
    description:
      'Không chỉ xuất hiện phổ biến trong những món như salad hay những đĩa rau sống trộn dầu giấm mayonnaise…, xà lách còn là vị thuốc tốt có tác dụng chống viêm, ức chế mạnh đối với nhiều loại vi khuẩn, virus và là một "mỹ phẩm" dưỡng da rất tốt.',
    link: "https://suckhoedoisong.vn/khong-chi-lam-salad-hang-loat-cong-dung-cua-xa-lach-khien-ban-bat-ngo-169210816233417484.htm",
  },
  {
    id: 4,
    title: "Cà rốt có tác dụng gì?",
    image: carrot_banner,
    description:
      "Với hàm lượng chất chống oxy hóa, beta carotene, các vitamin và khoáng chất dồi dào, cà rốt được xem là một trong những thực phẩm cực tốt cho sức khỏe chúng ta. Cà rốt làm tốt vai trò cải thiện thị lực, ngăn chặn tế bào ung thư, tốt cho bệnh tiểu đường, làm đẹp da, giữ dáng thậm chí còn được sử dụng để làm vắc xin chống lại virus HIV. Vậy ăn cà rốt có tác dụng gì?",
    link: "https://www.vinmec.com/vie/bai-viet/ca-rot-co-tac-dung-gi-vi",
  },
];

const page = () => {
  const { products } = useProductContext();

  return (
    <div>
      {/* Article List Section */}
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-4xl font-poppins-bold mb-8 pl-16">
          Các bài báo về thực phẩm sạch
        </h1>
        <div className="flex flex-wrap justify-center gap-x-44 gap-y-22">
          {articles.map((article) => {
            // Filter products based on the article title
            const filteredProducts = products.filter((p) =>
              article.title.includes(p.title),
            );

            return (
              <div
                key={article.id}
                className="w-full sm:w-1/2 lg:w-2/5 border border-gray-300 rounded-lg overflow-hidden"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-poppins-bold mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{article.description}</p>
                  <Link
                    href={article.link}
                    className="font-poppins-semi-bold text-[#28b14b] hover:underline"
                  >
                    Đọc thêm
                  </Link>
                  {/* Display products related to the article */}
                  <div className="pt-5 w-5/2">
                    <Product items={filteredProducts} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
