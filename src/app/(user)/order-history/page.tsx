import SearchBar from "@/src/components/admin/search";
import CardOrder from "@/src/components/card/CardOrder";
import Page401 from "@/src/components/error/Page401";
import { cookies } from "next/headers";

export default function OrderHistory({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (sessionToken == undefined) {
    return (
      //khi het token se hien ra thong bao yeu cau dang nhap lai
      <Page401/>
    );
    // <page_401 />;
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Tất cả
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Đang hoạt động
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              Hoàn thành
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Đã hủy
            </a>
          </li>
        </ul>

        <div className="mt-3">
          {/* <input
            type="text"
            className="form-control"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
          /> */}
          <SearchBar placeholder={`Bạn có thể tìm kiếm theo tên gói`} /> 
        </div>
        <CardOrder
          query={query}
          currentPage={currentPage}
          sessionToken={sessionToken}
        />
      </div>
    </div>
  );
}
