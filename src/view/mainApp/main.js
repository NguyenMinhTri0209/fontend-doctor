import React, { useState, useRef, useEffect } from "react";
import "./main.css";
import Logo from "./logo.png";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import Modal from "react-modal";

import Select from "react-select";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import viLocale from "@fullcalendar/core/locales/vi";

function MainApp(props) {
  const [isClose, setIsClose] = useState(false);
  const { user } = props;

  //màu active khi nút bên menu trái được bấm
  const [isCloseTC, setIsCloseTC] = useState("nav-link tc");

  const textColor = {
    backgroundColor: "#877dfe",
    borderRadius: "5px",
  };

  const handleSetCloseTC = (event) => {
    setIsCloseTC(event.currentTarget.className);
  };

  //list data hsba custom
  const [dataHsbaCustom, setDataCustom] = useState([]);
  const [dataBN, setDataBN] = useState([]);
  const [dataBenh, setDataBenh] = useState([]);
  const [dataThuoc, setThuoc] = useState([]);
  const [dataPhieuThuoc, setPhieuThuoc] = useState([]);
  const [dataNV, setDataNV] = useState([]);
  const [dataBSm, setdataBs] = useState([]);
  const [dataBillcs, setDataBillcs] = useState([]);
  const [dataBillcscn, setDataBillcscn] = useState([]);
  const [lichKham, setLK] = useState([]);
  const [lickKhamnv, setLKNV] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/healthrecord/getallhsba")
      .then((response) => setDataCustom(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/patient/getall")
      .then((response) => setDataBN(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/disease/getall")
      .then((response) => setDataBenh(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/medicine/getall")
      .then((response) => setThuoc(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/medicine/getmediall")
      .then((response) => setPhieuThuoc(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/staff/getall")
      .then((response) => setDataNV(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/doctor/getall")
      .then((response) => setdataBs(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/bill/getallcs")
      .then((response) => setDataBillcs(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/bill/getallcscn")
      .then((response) => setDataBillcscn(response.data))
      .catch((error) => console.log(error));

    const linkLK =
      "http://localhost:8080/registerservice/getlist/" + currentUser.mabs;
    axios
      .get(linkLK)
      .then((response) => setLK(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/registerservice/getlistxn")
      .then((response) => setLKNV(response.data))
      .catch((error) => console.log(error));
  }, []);

  const events = lichKham.map((lich) => ({
    title: lich.ghichu,
    start: new Date(lich.ngaykham),
    malichkham: lich.malichkham,
  }));

  const [isOpenLK, setIsOpenLK] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);

  // const openModal = (event) => {
  //   setSelectedEvent(event);
  //   console.log(event);
  //   setIsOpenLK(true);
  // };

  const [makx, setmakx] = useState("");

  const openModal = (info) => {
    const event = info.event;
    const { title, start, malichkham } = event.extendedProps;
    setmakx(malichkham);
    console.log(malichkham);
    setIsOpenLK(true);
  };

  const closeModal = () => {
    setIsOpenLK(false);
  };

  const khamxong = (id) => {
    const linkLKt = "http://localhost:8080/registerservice/update/" + id;

    axios
      .get(linkLKt)
      .then((response) => {
        // Xóa phần tử đã được nhấn vào khỏi mảng lichKham
        setLK((prevLichKham) =>
          prevLichKham.filter((lich) => lich.malichkham !== id)
        );
      })
      .then(() => {
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  //pop up tong
  //pop up thanh toan chi tiet
  const [thanhToan, setThanhToan] = useState(false);
  const togglesetThanhToan = () => {
    setThanhToan(!thanhToan);
  };

  const [thanhToancn, setThanhToancn] = useState(false);
  const togglesetThanhToancn = () => {
    setThanhToancn(!thanhToancn);
  };

  //pop up thanh toan tinh tien
  const [thanhToanTT, setThanhToanTT] = useState(false);
  const togglesetThanhToanTT = () => {
    setThanhToanTT(!thanhToanTT);
  };

  // pop up
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [phieuThuocPopup, toggleModalPT] = useState(false);
  const toggleModalPTpopup = () => {
    toggleModalPT(!phieuThuocPopup);
  };

  const [DataRow, setDataRow] = useState(null);
  const handleAddNoteClick = (row) => {
    // Xử lý dữ liệu
    setDataRow(row);
    // Gọi hàm toggleModal để hiển thị popup
    toggleModal();
  };

  const [isOpenBHYT, setIsOpenBHYT] = useState(false);
  const toggleBHYT = () => {
    setIsOpenBHYT(!isOpenBHYT);
  };

  const [DataBHYT, setDataBHYT] = useState(null);
  const handlePopupBHYT = (row) => {
    const linkApi = "http://localhost:8080/insurance/getbyid/" + row;
    axios
      .get(linkApi)
      .then((response) => setDataBHYT(response.data))
      .catch((error) => console.log(error));
    toggleBHYT();
  };

  const [DataPopupPT, setDataPopup] = useState([]);
  const handlephieuthuoc = (row) => {
    const linkApi =
      "http://localhost:8080/prescriptiondtl/getbymaphieuthuoc/" + row;
    axios
      .get(linkApi)
      .then((response) => setDataPopup(response.data))
      .catch((error) => console.log(error));
    toggleModalPTpopup();
  };

  //sửa, xóa phiếu thuốc
  // chỉ có thể sửa hoặc xóa phiếu thuốc khi đó là bệnh nhân của bác sĩ đăng nhập

  const [isOpenEditPt, setIsOpenEditPT] = useState(false);
  const toggleModalEditPt = () => {
    setIsOpenEditPT(!isOpenEditPt);
  };

  const [tenthuoc, settenthuoc] = useState(null);
  const handleThayDoiTenThuoc = (event) => {
    settenthuoc(event.target.value);
  };

  //lấy số lượng thuốc
  const [soluong, setsoluong] = useState(null);
  const handleThayDoiSoLuong = (event) => {
    setsoluong(event.target.value);
  };

  //lấy mã
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [DataRowTamPTSua, setDataRowTamPTSua] = useState({});
  const handleLuuPT = () => {
    axios
      .put(
        "http://localhost:8080/prescriptiondtl/update/" +
          DataRowTamPTSua.mactpn,
        {
          maphieuthuoc: DataRowTamPTSua.maphieuthuoc,
          mathuoc: selectedOption.value,
          soluong: soluong,
        }
      )
      .then((response) => {
        console.log(response.data); // Xử lý kết quả trả về từ API (nếu có)
        toggleModalEditPt();
        toast.success("Thêm thành công, xin kiểm tra lại!");
        const linkApi =
          "http://localhost:8080/prescriptiondtl/getbymaphieuthuoc/" +
          DataRowTamPTSua.maphieuthuoc;
        axios
          .get(linkApi)
          .then((response) => setDataPopup(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSuaThuoc = (row) => {
    setDataRowTamPTSua(row);
    settenthuoc(row.tenThuoc);
    setsoluong(row.soluong);

    console.log(row);
    const linkApi =
      "http://localhost:8080/precription/getbyid/" + row.maphieuthuoc;
    axios
      .get(linkApi)
      .then((response) => {
        // console.log(response.data);
        if (response.data.mabs && response.data.mabs !== currentUser?.mabs) {
          toast.error("Bạn không phải là bác sĩ trực tiếp kê đơn");
        } else {
          toggleModalEditPt();
        }
      })
      .catch((error) => console.log(error));
  };

  const dataThuocSelect = dataThuoc.map((dataThuoc) => ({
    value: dataThuoc.mathuoc,
    label: dataThuoc.tenthuoc,
  }));

  const [isXoa, setIsXoa] = useState(false);
  const [bienXoaPT, setBienXoaPT] = useState("");

  const xoaThuoc = (row) => {
    setIsXoa(!isXoa);
    setBienXoaPT(row);
  };

  const handleXoaRowPT = () => {
    console.log(bienXoaPT);
    const linkApi =
      "http://localhost:8080/prescriptiondtl/delete/" + bienXoaPT.mactpn;
    console.log(linkApi);
    axios
      .delete(linkApi)
      .then((response) => {
        toast.success("Xóa thành công");
        const linkApiTwo =
          "http://localhost:8080/prescriptiondtl/getbymaphieuthuoc/" +
          bienXoaPT.maphieuthuoc;
        axios
          .get(linkApiTwo)
          .then((response) => setDataPopup(response.data))
          .catch((error) => console.log(error));
        setIsXoa(!isXoa);
      })
      .catch((error) => {
        console.error(error); // In ra lỗi trong trường hợp yêu cầu không thành công
      });
  };

  // kê thuốc

  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, { tenThuoc: "", soLuong: "" }]);
  };

  const handleTatThemThuoc = () => {
    setRows([]);
    setSelectedOptionThuoc(null);
    setkethuoc(!kethuoc);
    setSelectedPatientName("");
  };

  const handleThayDoiSoLuongct = (value, index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].soLuong = value;
      return updatedRows;
    });
  };

  const handleThayDoiTenThuocct = (selectedOption, index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].tenThuoc = selectedOption.value; // Lưu ID của selectedOption
      return updatedRows;
    });
  };

  const databnSelect = dataBN.map((dataBN) => ({
    value: dataBN.mabn,
    label: dataBN.mabn,
  }));

  const selectedPatient = dataBN.find(
    (data) => data.mabn === selectedOption?.value
  );

  const [selectedOptionThuoc, setSelectedOptionThuoc] = useState(null);
  const handleSelectChangeThuoc = (selectedOption) => {
    setSelectedOptionThuoc(selectedOption);
  };

  const [selectedMaBenhNhan, setSelectedMaBenhNhan] = useState("");
  const [kethuoc, setkethuoc] = useState(false);
  const [themmaphieuthuoc, setthemmaphieuthuoc] = useState();
  const [themmactpn, setmactpn] = useState();
  const currentDate = new Date();
  let ngayhientai = currentDate.toLocaleDateString();
  const handleSetKeThuoc = () => {
    setkethuoc(!kethuoc);
    //lấy mã id
    axios
      .get("http://localhost:8080/precription/layma")
      .then((response) => setthemmaphieuthuoc(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/prescriptiondtl/laymactpn")
      .then((response) => setmactpn(response.data))
      .catch((error) => console.log(error));
  };

  const [selectedPatientName, setSelectedPatientName] = useState([]);

  const handleSelectMaBenhNhan = (selectedOption) => {
    setSelectedMaBenhNhan(selectedOption.value);

    const linkApi =
      "http://localhost:8080/patient/getbyid/" + selectedOption.value;

    console.log(linkApi);

    axios
      .get(linkApi)
      .then((response) => setSelectedPatientName(response.data))
      .catch((error) => console.log(error));
  };

  const handleLuuKeThuoc = () => {
    const ngayhientai = currentDate.toISOString();
    let maphieuthuoc; // Biến để lưu mã phiếu thuốc
    let tempmactpn = themmactpn; // Biến tạm để lưu giá trị mới

    axios
      .post("http://localhost:8080/precription/save", {
        maphieuthuoc: themmaphieuthuoc,
        mabn: selectedMaBenhNhan,
        mabs: currentUser.mabs,
        ngayxuatthuoc: ngayhientai,
      })
      .then((response) => {
        maphieuthuoc = response.data.maphieuthuoc; // Lấy mã phiếu thuốc từ response
        toast.success("Thêm phiếu thuốc thành công!");

        const requests = rows.map((row, index) => {
          const { tenThuoc, soLuong } = row;
          const newMactpn =
            tempmactpn.slice(0, -2) + (parseInt(tempmactpn.slice(-2)) + 1); // Cộng giá trị mới vào themmactpn
          tempmactpn = newMactpn; // Cập nhật giá trị của themmactpn
          console.log(newMactpn, maphieuthuoc, tenThuoc, soLuong); // Hiển thị tên thuốc
          return axios.post("http://localhost:8080/prescriptiondtl/save", {
            mactpn: newMactpn,
            maphieuthuoc: maphieuthuoc,
            mathuoc: tenThuoc, // Thay đổi tại đây để lấy tên thuốc
            soluong: soLuong,
          });
        });

        Promise.all(requests)
          .then((responses) => {
            console.log(responses.data);
            toast.success("Thêm danh sách thuốc thành công!");
            axios
              .get("http://localhost:8080/medicine/getmediall")
              .then((response) => setPhieuThuoc(response.data))
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.error(error);
            toast.error("Có lỗi xảy ra khi thêm danh sách thuốc!");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra khi thêm phiếu thuốc!");
      });
  };

  // Thanh toán bệnh nhân
  const [maBLThanhToan, setBLBNTT] = useState("");
  const [maBNThanhToan, setMaBNTT] = useState("");
  const [tenBNThanhToan, setTenBNTT] = useState("");
  const [maBHBNThanhToan, setmaBHBNTT] = useState("");
  const [maNVThanhToan, setmaNVTT] = useState("");
  const [tenNVThanhToan, setTenNVTT] = useState("");

  const [dvbnsd, setdvbnsd] = useState([]);
  const [tbnsd, settbnsd] = useState([]);
  const [pxnbnsd, setpxnbnsd] = useState([]);
  const [bill, setbill] = useState([]);

  const handleClickThanhToan = (row) => {
    setBLBNTT(row.mabienlai);
    setMaBNTT(row.mabn);
    setTenBNTT(row.tenbn);
    setmaBHBNTT(row.mabh);

    const linkApidv = "http://localhost:8080/service/getdvbn/" + row.mabn;
    axios
      .get(linkApidv)
      .then((response) => setdvbnsd(response.data))
      .catch((error) => console.log(error));

    const linkApit = "http://localhost:8080/precription/getptbn/" + row.mabn;
    axios
      .get(linkApit)
      .then((response) => settbnsd(response.data))
      .catch((error) => console.log(error));

    const linkApxn = "http://localhost:8080/testdtl/getptbn/" + row.mabn;
    axios
      .get(linkApxn)
      .then((response) => setpxnbnsd(response.data))
      .catch((error) => console.log(error));

    togglesetThanhToan();
  };

  const handleClickThanhToancn = (row) => {
    setBLBNTT(row.mabienlai);
    setMaBNTT(row.mabn);
    setTenBNTT(row.tenbn);
    setmaBHBNTT(row.mabh);

    const linkApidv = "http://localhost:8080/service/getdvbn/" + row.mabn;
    axios
      .get(linkApidv)
      .then((response) => setdvbnsd(response.data))
      .catch((error) => console.log(error));

    const linkApit = "http://localhost:8080/precription/getptbn/" + row.mabn;
    axios
      .get(linkApit)
      .then((response) => settbnsd(response.data))
      .catch((error) => console.log(error));

    const linkApxn = "http://localhost:8080/testdtl/getptbn/" + row.mabn;
    axios
      .get(linkApxn)
      .then((response) => setpxnbnsd(response.data))
      .catch((error) => console.log(error));

    togglesetThanhToancn();
  };

  const handleTT = () => {
    const linkApiBill = "http://localhost:8080/bill/chechbill/" + maBNThanhToan;
    axios
      .get(linkApiBill)
      .then((response) => {
        setbill(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    togglesetThanhToanTT();
  };

  //in hóa đơn pdf
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const docDefinition = {
    content: [
      {
        columns: [
          {
            text: [
              { text: "BỆNH VIỆN ĐA KHOA\n", alignment: "left", fontSize: 14 },
              { text: "HUYỆN VẠN NINH\n", alignment: "left", fontSize: 14 },
            ],
          },
          {
            text: [
              {
                text: "VẠN LƯƠNG, VẠN NINH, KHÁNH HÒA\n",
                alignment: "right",
                fontSize: 14,
              },
              { text: "SDT: 0965.021.515\n", alignment: "right", fontSize: 14 },
            ],
          },
        ],
      },
      { text: "\n\n" },
      { text: "HÓA ĐƠN VIỆN PHÍ", alignment: "center", fontSize: 16 },
      { text: "\n\n" },
      {
        columns: [
          {
            width: "33%",
            text: [{ text: "Mã biên lai: " + maBLThanhToan }],
          },
          {
            width: "33%",
            text: [{ text: "Ngày thanh toán: " + ngayhientai }],
          },
        ],
      },
      { text: "\n" },
      {
        columns: [
          {
            width: "33%",
            text: [{ text: "Mã bệnh nhân: " + maBNThanhToan }],
          },
          {
            width: "33%",
            text: [{ text: "Tên bệnh nhân: " + tenBNThanhToan }],
          },
          {
            width: "33%",
            text: [
              { text: "Mã bảo hiểm: " + maBHBNThanhToan, alignment: "right" },
            ],
          },
        ],
      },
      {
        text: "Dịch vụ đã sử dụng:",
        style: "header",
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Mã dịch vụ", style: "tableHeader", alignment: "center" },
              {
                text: "Tên dịch vụ",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "Áp dụng BHYT",
                style: "tableHeader",
                alignment: "center",
              },
              { text: "Số lượng", style: "tableHeader", alignment: "center" },
              { text: "Đơn giá", style: "tableHeader", alignment: "center" },
            ],
            ...dvbnsd.map((row) => [
              row.madv,
              row.tendv,
              row.apmuchuong ? "Có" : "Không",
              row.soluong,
              `${row.dongia} đ`,
            ]),
          ],
        },
      },
      {
        text: "Phiếu thuốc:",
        style: "header",
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Mã thuốc", style: "tableHeader", alignment: "center" },
              { text: "Tên thuốc", style: "tableHeader", alignment: "center" },
              { text: "Số lượng", style: "tableHeader", alignment: "center" },
              { text: "Đơn giá", style: "tableHeader", alignment: "center" },
            ],
            ...tbnsd.map((row) => [
              row.mathuoc,
              row.tenthuoc,
              row.soluong,
              `${row.dongia} đ`,
            ]),
          ],
        },
      },
      { text: "\n" },
      { text: "Phiếu xét nghiệm:", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto"],
          body: [
            [
              {
                text: "Mã loại xét nghiệm",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "Tên xét nghiệm",
                style: "tableHeader",
                alignment: "center",
              },
              { text: "Đơn giá", style: "tableHeader", alignment: "center" },
            ],
            ...pxnbnsd.map((row) => [
              row.maloaixn,
              row.tenxn,
              `${row.dongia} đ`,
            ]),
          ],
        },
      },
      { text: "\n" },
      { text: "Thành tiền:", style: "header" },
      {
        table: {
          widths: ["auto", "auto"],
          body: [
            [
              { text: "Chi phí dịch vụ: ", alignment: "left" },
              { text: bill.tiendvcg + " đ", alignment: "right" },
            ],
            [
              { text: "Chi phí thuốc: ", alignment: "left" },
              { text: bill.tienthuoc + " đ", alignment: "right" },
            ],
            [
              { text: "Chi phí xét nghiệm: ", alignment: "left" },
              { text: bill.tienxn + " đ", alignment: "right" },
            ],
            [
              { text: "Bảo hiểm hỗ trợ: ", alignment: "left" },
              { text: bill.tienbh + " đ", alignment: "right" },
            ],
            [
              { text: "Chi phí tổng kết: ", alignment: "left" },
              {
                text:
                  bill.tiendvcg +
                  bill.tienthuoc +
                  bill.tienxn -
                  bill.tienbh +
                  " đ",
                alignment: "right",
              },
            ],
          ],
        },
      },
      { text: "\n\n" },
      {
        columns: [
          {
            width: "50%",
            text: {
              text:
                "Thành tiền: " +
                (bill.tiendvcg + bill.tienthuoc + bill.tienxn - bill.tienbh) +
                " đ",
              bold: true,
              fontSize: 14,
            },
          },
        ],
      },
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        fillColor: "#a2a4a5",
      },
    },
  };

  const xacnhantt = (mabl) => {
    const linkApi = "http://localhost:8080/bill/xacnhan/" + mabl;
    axios
      .get(linkApi)
      .then((response) => {
        setbill(response.data);
        togglesetThanhToanTT();
        togglesetThanhToan();

        axios
          .get("http://localhost:8080/bill/getallcs")
          .then((response) => setDataBillcs(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download("hd" + maBLThanhToan + ".pdf");
  };

  //hồ sơ bệnh án
  const columnsHsba = [
    {
      dataField: "mahsba",
      text: "Mã hồ sơ bệnh án:",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
      filter: textFilter({
        placeholder: "Mã  HSBA",
      }),
      search: true,
    },
    {
      dataField: "mabn",
      text: "Mã bệnh nhân",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
      filter: textFilter({
        placeholder: "Mã bệnh nhân",
      }),
      search: true,
    },
    {
      dataField: "ten",
      text: "Tên bệnh nhân",
      headerStyle: {
        backgroundColor: "#a2a4a5",
        cursor: "pointer",
      },
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      search: true,
    },
    {
      dataField: "gioitinh",
      text: "Giới tính",
      formatter: (cell, row) => {
        return cell ? "Nam" : "Nữ";
      },

      headerStyle: () => {
        return { width: "90px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "ngaysinh",
      text: "Ngày sinh",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "mabhyt",
      text: "Mã BHYT",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
      formatter: (cell, row) => (
        <a href="#" onClick={() => handlePopupBHYT(cell)}>
          {cell}
        </a>
      ),
    },
    {
      dataField: "ngaybd",
      text: "Ngày bắt đầu",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "ngaykt",
      text: "Ngày kết thúc",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Chi tiết",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i
            className="bx bx-detail"
            style={{ cursor: "pointer" }}
            onClick={() => handleAddNoteClick(row)}
          />
        </div>
      ),
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //phiếu lĩnh thuốc
  const columnsPhieuThuoc = [
    {
      dataField: "maphieuthuoc",
      text: "Mã phiếu thuốc",
      filter: textFilter({
        placeholder: "Mã phiếu thuốc",
      }),
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      search: true,
    },

    {
      dataField: "tenbs",
      text: "Tên bác sĩ kê thuốc",
      filter: textFilter({
        placeholder: "Tên bác sĩ",
      }),
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "tenbn",
      text: "Tên bệnh nhân",
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "ngayxuatthuoc",
      text: "Ngày xuất thuốc",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
    },
    {
      text: "Chi tiết",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i
            className="bx bx-detail"
            style={{ cursor: "pointer" }}
            onClick={() => handlephieuthuoc(row.maphieuthuoc)}
          />
        </div>
      ),
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  // hồ sơ bệnh nhân
  const columnsBNAD = [
    {
      dataField: "mabn",
      text: "Mã bệnh nhân",
      filter: textFilter({
        placeholder: "Mã BN",
      }),
      headerStyle: () => {
        return { width: "140px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "ten",
      text: "Tên bệnh nhân",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      search: true,
    },
    {
      dataField: "ngaysinh",
      text: "Ngày sinh",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "email",
      text: "Email",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "gioitinh",
      text: "Giới tính",
      formatter: (cell, row) => {
        return cell ? "Nam" : "Nữ";
      },
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "sodienthoai",
      text: "Số điện thoại",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "cccd",
      text: "CCCD",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "mabh",
      text: "Mã bảo hiểm",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "nghenghiep",
      text: "Nghề nghiệp",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      text: "Xóa",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i className="bx bx-trash" style={{ cursor: "pointer" }} />
        </div>
      ),
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //thông tin bệnh nhân
  const columnsBN = [
    {
      dataField: "mabn",
      text: "Mã bệnh nhân",
      filter: textFilter({
        placeholder: "Mã BN",
      }),
      headerStyle: () => {
        return { width: "140px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "ten",
      text: "Tên bệnh nhân",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      search: true,
    },
    {
      dataField: "ngaysinh",
      text: "Ngày sinh",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "email",
      text: "Email",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "gioitinh",
      text: "Giới tính",
      formatter: (cell, row) => {
        return cell ? "Nam" : "Nữ";
      },
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "sodienthoai",
      text: "Số điện thoại",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "cccd",
      text: "CCCD",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "mabh",
      text: "Mã bảo hiểm",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
    {
      dataField: "nghenghiep",
      text: "Nghề nghiệp",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },
  ];

  // thông tin thuốc
  const columnThuoc = [
    {
      dataField: "mathuoc",
      text: "Mã thuốc",
      filter: textFilter({
        placeholder: "Mã thuốc",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "tenthuoc",
      text: "Tên thuốc",
      filter: textFilter({
        placeholder: "Tên thuốc",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "dongia",
      text: "Đơn giá",
      headerStyle: () => {
        return { width: "110px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => {
        return cell + " VND";
      },
    },
    {
      dataField: "donvitinh",
      text: "Đơn vị tính",
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "cachdung",
      text: "Cách dùng",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "thanhphan",
      text: "Thành phần",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "hangsx",
      text: "Hãng",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "ngaysx",
      text: "NSX",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "hansd",
      text: "HSD",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //cột thuốc cho admin
  const columnThuocAD = [
    {
      dataField: "mathuoc",
      text: "Mã thuốc",
      filter: textFilter({
        placeholder: "Mã thuốc",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "tenthuoc",
      text: "Tên thuốc",
      filter: textFilter({
        placeholder: "Tên thuốc",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "dongia",
      text: "Đơn giá",
      headerStyle: () => {
        return { width: "110px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => {
        return cell + " VND";
      },
    },
    {
      dataField: "donvitinh",
      text: "Đơn vị tính",
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "cachdung",
      text: "Cách dùng",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "thanhphan",
      text: "Thành phần",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "hangsx",
      text: "Hãng",

      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "ngaysx",
      text: "NSX",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "hansd",
      text: "HSD",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Sửa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-edit-alt"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      text: "Xóa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-trash"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  //thông tin bệnh
  const columnBenh = [
    {
      dataField: "mabenh",
      text: "Mã bệnh",
      filter: textFilter({
        placeholder: "Mã bệnh",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "tenbenh",
      text: "Tên bệnh",
      filter: textFilter({
        placeholder: "Tên bệnh",
      }),
      headerStyle: () => {
        return {
          width: "120px",
          backgroundColor: "#a2a4a5",
          marginRight: "50px",
        };
      },
      search: true,
    },
    {
      dataField: "trieuchung",
      text: "Triệu chứng",
      filter: textFilter({
        placeholder: "Triệu chứng",
      }),
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
  ];

  // Thông tin pop up cuẩ mã phiếu bệnh
  const columsPTPopup = [
    {
      dataField: "maphieuthuoc",
      text: "Mã phiếu thuốc",
      filter: textFilter({
        placeholder: "Mã bệnh",
      }),
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "mactpn",
      text: "Mã CTPT",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "tenThuoc",
      text: "Tên thuốc",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "soluong",
      text: "SL",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      text: "Sửa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-edit-alt"
            style={{ marginRight: "5px", cursor: "pointer" }}
            onClick={() => handleSuaThuoc(row)}
          />
        </div>
      ),
    },
    {
      text: "Xóa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-trash"
            style={{ marginRight: "5px", cursor: "pointer" }}
            onClick={() => xoaThuoc(row)}
          />
        </div>
      ),
    },
  ];

  //Bảng nhân viên
  const columnsNhanVien = [
    {
      dataField: "manv",
      text: "Mã nhân viên",
      filter: textFilter({
        placeholder: "Mã nhân viên",
      }),
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      search: true,
    },

    {
      dataField: "ten",
      text: "Tên nhân viên",
      filter: textFilter({
        placeholder: "Tên nhân viên",
      }),
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      search: true,
    },
    {
      dataField: "ngaysinh",
      text: "Ngày sinh",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
    },
    {
      dataField: "diachi",
      text: "Địa chỉ",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "gioitinh",
      text: "Giới tính",
      formatter: (cell, row) => {
        return cell ? "Nam" : "Nữ";
      },
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "chucvu",
      text: "Chức vụ",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "sodienthoai",
      text: "Số điện thoại",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "tentk",
      text: "Tên tài khoản",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "matkhau",
      text: "Mật khẩu",
      headerStyle: () => {
        return { backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Sửa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-edit-alt"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      text: "Xóa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-trash"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  // Bảng y tá, bác sĩ
  const columnsBacSi = [
    {
      dataField: "mabs",
      text: "Mã bác sĩ:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã bác sĩ",
      }),
      search: true,
    },

    {
      dataField: "makhoa",
      text: "Mã khoa",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã khoa",
      }),
      search: true,
    },

    {
      dataField: "ten",
      text: "Tên",
      headerStyle: () => {
        return { width: "150px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Tên bác sĩ",
      }),
      search: true,
    },

    {
      dataField: "diachi",
      text: "Địa chỉ",
      headerStyle: {
        backgroundColor: "#a2a4a5",
      },
    },

    {
      dataField: "sodienthoai",
      text: "Số điện thoại",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "gioitinh",
      text: "Giới tính",
      formatter: (cell, row) => {
        return cell ? "Nam" : "Nữ";
      },
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "ngaysinh",
      text: "Ngày sinh",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "trinhdo",
      text: "Trình độ",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "chucvu",
      text: "Chức vụ",
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Sửa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-edit-alt"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      text: "Xóa",
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cell, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bx bx-trash"
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  //bảng nhà cung cấp

  //bảng dịch vụ

  // bảng dịch vụ bệnh nhân đã sử dụng
  const columnsdvsd = [
    {
      dataField: "madv",
      text: "Mã dịch vụ",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "tendv",
      text: "Tên dịch vụ",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "apmuchuong",
      text: "Áp dụng BHYT",
      headerStyle: () => {
        return { width: "40px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cellContent, row) => {
        return row.apmuchuong ? "Có" : "Không";
      },
    },
    {
      dataField: "soluong",
      text: "Số lượng",
      headerStyle: () => {
        return { width: "35px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "dongia",
      text: "Đơn giá",
      headerStyle: () => {
        return { width: "40px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cellContent, row) => {
        return `${cellContent} đ`;
      },
    },
  ];

  //bảng bill thanh toán
  const columnsTT = [
    {
      dataField: "mabienlai",
      text: "Mã biên lai:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã biên lai",
      }),
      search: true,
    },

    {
      dataField: "manv",
      text: "Mã nhân viên:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã nhân viên",
      }),
      search: true,
    },

    {
      dataField: "tennv",
      text: "Tên nhân viên:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Tên nhân viên",
      }),
      search: true,
    },

    {
      dataField: "mabn",
      text: "Mã bệnh nhân:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã bệnh nhân",
      }),
      search: true,
    },

    {
      dataField: "mabn",
      text: "Tên bệnh nhân:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      search: true,
    },

    {
      dataField: "ngaythanhtoan",
      text: "Ngày thanh toán",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "giamgia",
      text: "Giảm giá",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "hinhthuctt",
      text: "Hình thức TT",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Chi tiết",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i
            className="bx bx-detail"
            onClick={() => handleClickThanhToan(row)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Thanh toán",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i className="bx bx-credit-card" style={{ cursor: "pointer" }} />
        </div>
      ),
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //bảng phiếu thuốc bệnh nhân sử dụng
  const columnsptbnsd = [
    {
      dataField: "mathuoc",
      text: "Mã thuốc",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "tenthuoc",
      text: "Tên thuốc",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "soluong",
      text: "Số lượng",
      headerStyle: () => {
        return { width: "35px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "dongia",
      text: "Đơn giá",
      headerStyle: () => {
        return { width: "40px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cellContent, row) => {
        return `${cellContent} đ`;
      },
    },
  ];

  // bảng phiếu thuốc bệnh nhân đã đóng
  const columnsTTcn = [
    {
      dataField: "mabienlai",
      text: "Mã biên lai:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã biên lai",
      }),
      search: true,
    },

    {
      dataField: "manv",
      text: "Mã nhân viên:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã nhân viên",
      }),
      search: true,
    },

    {
      dataField: "tennv",
      text: "Tên nhân viên:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Tên nhân viên",
      }),
      search: true,
    },

    {
      dataField: "mabn",
      text: "Mã bệnh nhân:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Mã bệnh nhân",
      }),
      search: true,
    },

    {
      dataField: "mabn",
      text: "Tên bệnh nhân:",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
      filter: textFilter({
        placeholder: "Tên bệnh nhân",
      }),
      search: true,
    },

    {
      dataField: "ngaythanhtoan",
      text: "Ngày thanh toán",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "giamgia",
      text: "Giảm giá",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },

    {
      dataField: "hinhthuctt",
      text: "Hình thức TT",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      text: "Chi tiết",
      formatter: (cell, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i
            className="bx bx-detail"
            onClick={() => handleClickThanhToancn(row)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
      headerStyle: () => {
        return { width: "50px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //bảng xét nghiệm bệnh nhân sử dụng
  const columnspxnbnsd = [
    {
      dataField: "maloaixn",
      text: "Mã loại xét nghiệm",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "tenxn",
      text: "Tên xét nghiệm",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "dongia",
      text: "Đơn giá",
      headerStyle: () => {
        return { width: "40px", backgroundColor: "#a2a4a5" };
      },
      formatter: (cellContent, row) => {
        return `${cellContent} đ`;
      },
    },
  ];

  // bảng lkham
  const columnslk = [
    {
      dataField: "malichkham",
      text: "Mã lich khám",
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
    {
      dataField: "ngaykham",
      text: "Ngày khasm",
      formatter: (cell, row) => {
        if (!cell) {
          return "";
        }
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#a2a4a5" };
      },
    },
  ];

  //chon tab
  const [currentTab, setCurrentTab] = useState("hsba");
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  //Chọn tab quản lý tài nguyên
  const [currentTabQLTN, setCurrentTabQLTN] = useState("qltn");
  const handleTabClickQLTN = (tab) => {
    setCurrentTabQLTN(tab);
  };

  // tab thanh toán bên nhân viên
  const [tabThanhToan, setThanhToanNV] = useState("tt");
  const handleTabThanhToan = (tab) => {
    setThanhToanNV(tab);
  };

  //tab thống kê bên admin
  const [tabtk, settk] = useState("tkt");
  const handleTabThanhToantk = (tab) => {
    settk(tab);
  };

  // Kiểm tra xem đã có giá trị trong local storage chưa
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Nếu đã có giá trị trong local storage thì lấy giá trị đó, nếu không thì lấy giá trị từ props
  const currentUser = storedUser ? storedUser : user;

  // Lưu trữ giá trị của user prop vào local storage
  localStorage.setItem("user", JSON.stringify(currentUser));

  const handleToggle = () => {
    setIsClose(!isClose);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Đăng xuất thành công");
    localStorage.removeItem("user");
    props.onLogout();
  };

  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const searchBtnRef = useRef(null);
  const modeSwitchRef = useRef(null);
  const modeTextRef = useRef(null);

  const handleToggleClick = () => {
    sidebarRef.current.classList.toggle("close");
  };

  const handleSearchClick = () => {
    sidebarRef.current.classList.remove("close");
  };

  const handleModeSwitchClick = () => {
    bodyRef.current.classList.toggle("dark");

    if (bodyRef.current.classList.contains("dark")) {
      modeTextRef.current.innerText = "Chế độ ban ngày";
    } else {
      modeTextRef.current.innerText = "Chế độ ban đêm";
    }
  };

  return (
    <mainBody ref={bodyRef}>
      <nav className="sidebarcs close" ref={sidebarRef}>
        <main-header>
          <div className="image-textcs">
            <span className="imagecs">
              <img src={Logo} alt="" />
            </span>

            <div className="textcs logo-text">
              <span className="namecs">Xin chào</span>
              <span style={{ cursor: "pointer" }} className="professioncs">
                {currentUser.ten}
              </span>
            </div>
          </div>

          <i
            className="bx bx-chevron-right togglecs"
            onClick={handleToggleClick}
            ref={toggleRef}
          ></i>
        </main-header>

        <div className="menu-barcs">
          {currentUser.quyen === "USER" &&
          currentUser.chucvu === "Nhân viên" ? (
            <div className="menucs">
              <li
                className="search-boxcs"
                onClick={handleSearchClick}
                ref={searchBtnRef}
              >
                <i className="bx bx-search iconcs"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </li>

              <ul className="menu-links">
                <li
                  className="nav-link tc"
                  style={isCloseTC == "nav-link tc" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-home-alt iconcs"></i>
                    <span className="textcs nav-text">Trang chủ</span>
                  </a>
                </li>

                <li
                  className="nav-link tk"
                  style={isCloseTC == "nav-link tk" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bxs-calculator iconcs"></i>
                    <span className="textcs nav-text">Thanh toán</span>
                  </a>
                </li>

                <li
                  className="nav-link tb"
                  style={isCloseTC == "nav-link tb" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-bell iconcs"></i>
                    <span className="textcs nav-text">Thông báo</span>
                  </a>
                </li>

                <li
                  className="nav-link pt"
                  style={isCloseTC == "nav-link pt" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-pie-chart-alt iconcs"></i>
                    <span className="textcs nav-text">Thống kê</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : currentUser.quyen === "USER" &&
            currentUser.chucvu !== "Nhân viên" ? (
            <div className="menucs">
              <li
                className="search-boxcs"
                onClick={handleSearchClick}
                ref={searchBtnRef}
              >
                <i className="bx bx-search iconcs"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </li>

              <ul className="menu-links">
                <li
                  className="nav-link tc"
                  style={isCloseTC == "nav-link tc" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-home-alt iconcs"></i>
                    <span className="textcs nav-text">Trang chủ</span>
                  </a>
                </li>

                <li
                  className="nav-link tb"
                  style={isCloseTC == "nav-link tb" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-bell iconcs"></i>
                    <span className="textcs nav-text">Thông báo</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="menucs">
              <li
                className="search-boxcs"
                onClick={handleSearchClick}
                ref={searchBtnRef}
              >
                <i className="bx bx-search iconcs"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </li>

              <ul className="menu-links">
                <li
                  className="nav-link tc"
                  style={isCloseTC == "nav-link tc" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-home-alt iconcs"></i>
                    <span className="textcs nav-text">Trang chủ</span>
                  </a>
                </li>

                <li
                  className="nav-link tk"
                  style={isCloseTC == "nav-link tk" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-bar-chart-alt-2 iconcs"></i>
                    <span className="textcs nav-text">Thống kê</span>
                  </a>
                </li>

                <li
                  className="nav-link tb"
                  style={isCloseTC == "nav-link tb" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-bell iconcs"></i>
                    <span className="textcs nav-text">Thông báo</span>
                  </a>
                </li>

                <li
                  className="nav-link pt"
                  style={isCloseTC == "nav-link pt" ? textColor : {}}
                  onClick={handleSetCloseTC}
                >
                  <a style={{ cursor: "pointer" }}>
                    <i className="bx bx-user iconcs"></i>
                    <span className="textcs nav-text">QL tài nguyên</span>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Chức năng bật chế độ ban đêm, ban ngày */}
          <div className="bottom-content">
            <li className="" onClick={handleLogout}>
              <a href="#">
                <i className="bx bx-log-out iconcs"></i>
                <span className="textcs nav-text">Đăng xuất</span>
              </a>
            </li>

            <li className="modecs">
              <div className="sun-mooncs">
                <i className="bx bx-moon iconcs mooncs"></i>
                <i className="bx bx-sun iconcs suncs"></i>
              </div>
              <span className="mode-text textcs" ref={modeTextRef}>
                Chế độ ban đêm
              </span>

              <div
                className="toggle-switch"
                onClick={handleModeSwitchClick}
                ref={modeSwitchRef}
              >
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      {currentUser.quyen === "USER" && currentUser.chucvu === "Nhân viên" ? (
        <section className="homecs">
          {isCloseTC == "nav-link tc" ? (
            <div className="textcs">
              <div className="App">
                <div className="hsba">
                  {/* tab */}

                  <button
                    className={`buttoncs ${
                      currentTab === "hsba" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("hsba")}
                  >
                    Hồ Sơ Bệnh Án
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "plthuoc" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("plthuoc")}
                  >
                    Phiếu Lĩnh Thuốc
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "bn" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("bn")}
                  >
                    Thông tin bệnh nhân
                  </button>
                </div>
                <div className="content">
                  {currentTab === "hsba" && (
                    <div className="hsba">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>HỒ SƠ BỆNH ÁN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mahsba"
                          data={dataHsbaCustom}
                          columns={columnsHsba}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                  {currentTab === "plthuoc" && (
                    <div className="plthuoc">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>PHIẾU LĨNH THUỐC</h2>
                          </th>
                        </tr>
                      </table>
                      <BootstrapTable
                        keyField="maphieuthuoc"
                        data={dataPhieuThuoc}
                        columns={columnsPhieuThuoc}
                        pagination={paginationFactory()}
                        rowStyle={{ backgroundColor: "#fff" }}
                        wrapperClasses="table-striped"
                        filter={filterFactory()}
                        search
                      />
                      <div></div>
                    </div>
                  )}
                  {currentTab === "bn" && (
                    <div className="bn">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>THÔNG TIN BỆNH NHÂN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mabn"
                          data={dataBN}
                          columns={columnsBN}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : isCloseTC == "nav-link tk" ? (
            <div className="textcs">
              <div className="App">
                <div className="tt">
                  {/* tab */}

                  <button
                    className={`buttoncs ${
                      tabThanhToan === "tt" ? "active" : ""
                    }`}
                    onClick={() => handleTabThanhToan("tt")}
                  >
                    Đóng Viện Phí
                  </button>

                  <button
                    className={`buttoncs ${
                      tabThanhToan === "lstt" ? "active" : ""
                    }`}
                    onClick={() => handleTabThanhToan("lstt")}
                  >
                    Lịch sử TT Hóa Đơn
                  </button>

                  <button
                    className={`buttoncs ${
                      tabThanhToan === "pnnv" ? "active" : ""
                    }`}
                    onClick={() => handleTabThanhToan("pnnv")}
                  >
                    TT Phiếu Nhập
                  </button>
                </div>
                <div className="content"></div>
              </div>

              {tabThanhToan === "tt" && (
                <div className="tt">
                  <table>
                    <tr>
                      <th>
                        <h2>DANH SÁCH THU VIỆN PHÍ</h2>
                      </th>
                    </tr>
                  </table>
                  <div>
                    <BootstrapTable
                      keyField="mabienlai"
                      data={dataBillcs}
                      columns={columnsTT}
                      pagination={paginationFactory()}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </div>
                </div>
              )}
              {tabThanhToan === "lstt" && (
                <div className="lstt">
                  <table>
                    <tr>
                      <th>
                        <h2>DANH SÁCH THU VIỆN PHÍ</h2>
                      </th>
                    </tr>
                  </table>
                  <div>
                    <BootstrapTable
                      keyField="mabienlai"
                      data={dataBillcscn}
                      columns={columnsTTcn}
                      pagination={paginationFactory()}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </div>
                </div>
              )}
            </div>
          ) : isCloseTC == "nav-link pt" ? (
            <div className="textcs">123</div>
          ) : (
            <div className="textcs">
              <div class="appointment-details">
                {lickKhamnv.map((appointment, index) => (
                  <div class="appointment-item">
                    <div class="detail-item">
                      <table className="Ttoan">
                        <tr>
                          <th>
                            <span class="detail-label">Mã lịch khám:</span>
                            <span class="detail-value">
                              {appointment.malichkham}
                            </span>
                          </th>
                          <th>
                            <span class="detail-label">Ngày khám:</span>
                            <span class="detail-value">
                              {appointment.ngaykham.split("T")[0]}
                            </span>
                          </th>

                          <th>
                            <span class="detail-label">Tên bệnh nhân:</span>
                            <span class="detail-value">
                              {appointment.tenbn}
                            </span>
                          </th>
                          <th>
                            <span class="detail-label">Số điện thoại:</span>
                            <span class="detail-value">
                              {appointment.sodienthoai}
                            </span>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <span class="detail-label">Tên dịch vụ:</span>
                            <span class="detail-value">
                              {appointment.tendv}
                            </span>
                          </th>
                          <th colSpan={2}>
                            <span class="detail-label">Ghi chú:</span>
                            <span class="detail-value">
                              {appointment.ghichu
                                ? appointment.ghichu
                                : "(Trống)"}
                            </span>
                          </th>

                          <th>
                            <div class="confirm-button">
                              <button>Xác nhận khám</button>
                            </div>
                          </th>
                        </tr>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : currentUser.quyen === "USER" && currentUser.chucvu !== "Nhân viên" ? (
        <section className="homecs">
          {isCloseTC == "nav-link tc" ? (
            <div className="textcs">
              <div className="App">
                <div className="hsba">
                  {/* tab */}

                  <button
                    className={`buttoncs ${
                      currentTab === "hsba" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("hsba")}
                  >
                    Hồ Sơ Bệnh Án
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "plthuoc" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("plthuoc")}
                  >
                    Phiếu Lĩnh Thuốc
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "bn" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("bn")}
                  >
                    Thông tin bệnh nhân
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "thuoc" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("thuoc")}
                  >
                    Thông tin thuốc
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "benh" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("benh")}
                  >
                    Thông tin bệnh
                  </button>
                </div>
                <div className="content">
                  {currentTab === "hsba" && (
                    <div className="hsba">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>HỒ SƠ BỆNH ÁN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mahsba"
                          data={dataHsbaCustom}
                          columns={columnsHsba}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                  {currentTab === "plthuoc" && (
                    <div className="plthuoc">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>PHIẾU LĨNH THUỐC</h2>
                          </th>
                          <button
                            className="buttonModalct"
                            onClick={handleSetKeThuoc}
                          >
                            Kê thuốc
                          </button>
                        </tr>
                      </table>
                      <BootstrapTable
                        keyField="maphieuthuoc"
                        data={dataPhieuThuoc}
                        columns={columnsPhieuThuoc}
                        pagination={paginationFactory()}
                        rowStyle={{ backgroundColor: "#fff" }}
                        wrapperClasses="table-striped"
                        filter={filterFactory()}
                        search
                      />
                      <div></div>
                    </div>
                  )}
                  {currentTab === "bn" && (
                    <div className="bn">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>THÔNG TIN BỆNH NHÂN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mabn"
                          data={dataBN}
                          columns={columnsBN}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                  {currentTab === "thuoc" && (
                    <div className="thuoc">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>THÔNG TIN THUỐC</h2>
                          </th>
                        </tr>
                      </table>
                      <BootstrapTable
                        keyField="mathuoc"
                        data={dataThuoc}
                        columns={columnThuoc}
                        pagination={paginationFactory()}
                        rowStyle={{ backgroundColor: "#fff" }}
                        wrapperClasses="table-striped"
                        filter={filterFactory()}
                        search
                      />
                    </div>
                  )}
                  {currentTab !== "hsba" &&
                    currentTab !== "plthuoc" &&
                    currentTab !== "bn" &&
                    currentTab !== "thuoc" && (
                      <div className="ttbenh">
                        <div className="thuoc">
                          <table>
                            <tr>
                              <th colspan="3">
                                <h2>THÔNG TIN BỆNH</h2>
                              </th>
                            </tr>
                          </table>
                          <div>
                            <BootstrapTable
                              keyField="mabenh"
                              data={dataBenh}
                              columns={columnBenh}
                              pagination={paginationFactory()}
                              rowStyle={{ backgroundColor: "#fff" }}
                              wrapperClasses="table-striped"
                              filter={filterFactory()}
                              search
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div className="textcs">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventContent={renderEventContent}
                className="full-calendar"
                locale={viLocale}
                eventClick={openModal} // Sử dụng hàm eventClick đã được cập nhật
              />
            </div>
          )}
        </section>
      ) : (
        <section className="homecs">
          {isCloseTC == "nav-link tc" ? (
            <div className="textcs">
              <div className="App">
                <div className="hsba">
                  {/* tab */}

                  <button
                    className={`buttoncs ${
                      currentTab === "hsba" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("hsba")}
                  >
                    Hồ Sơ Bệnh Án
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "plthuoc" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("plthuoc")}
                  >
                    Phiếu Lĩnh Thuốc
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "bn" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("bn")}
                  >
                    Thông tin bệnh nhân
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "thuoc" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("thuoc")}
                  >
                    Thông tin thuốc
                  </button>

                  <button
                    className={`buttoncs ${
                      currentTab === "benh" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("benh")}
                  >
                    Thông tin bệnh
                  </button>
                </div>
                <div className="content">
                  {currentTab === "hsba" && (
                    <div className="hsba">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>HỒ SƠ BỆNH ÁN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mahsba"
                          data={dataHsbaCustom}
                          columns={columnsHsba}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                  {currentTab === "plthuoc" && (
                    <div className="plthuoc">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>PHIẾU LĨNH THUỐC</h2>
                          </th>
                          <button
                            className="buttonModalct"
                            onClick={handleSetKeThuoc}
                          >
                            Kê thuốc
                          </button>
                        </tr>
                      </table>
                      <BootstrapTable
                        keyField="maphieuthuoc"
                        data={dataPhieuThuoc}
                        columns={columnsPhieuThuoc}
                        pagination={paginationFactory()}
                        rowStyle={{ backgroundColor: "#fff" }}
                        wrapperClasses="table-striped"
                        filter={filterFactory()}
                        search
                      />
                    </div>
                  )}
                  {currentTab === "bn" && (
                    <div className="bn">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>THÔNG TIN BỆNH NHÂN</h2>
                          </th>
                        </tr>
                      </table>
                      <div>
                        <BootstrapTable
                          keyField="mabn"
                          data={dataBN}
                          columns={columnsBNAD}
                          pagination={paginationFactory()}
                          rowStyle={{ backgroundColor: "#fff" }}
                          wrapperClasses="table-striped"
                          filter={filterFactory()}
                          search
                        />
                      </div>
                    </div>
                  )}
                  {currentTab === "thuoc" && (
                    <div className="thuoc">
                      <table>
                        <tr>
                          <th colspan="3">
                            <h2>THÔNG TIN THUỐC</h2>
                          </th>
                        </tr>
                      </table>
                      <BootstrapTable
                        keyField="mathuoc"
                        data={dataThuoc}
                        columns={columnThuoc}
                        pagination={paginationFactory()}
                        rowStyle={{ backgroundColor: "#fff" }}
                        wrapperClasses="table-striped"
                        filter={filterFactory()}
                        search
                      />
                    </div>
                  )}
                  {currentTab !== "hsba" &&
                    currentTab !== "plthuoc" &&
                    currentTab !== "bn" &&
                    currentTab !== "thuoc" && (
                      <div className="ttbenh">
                        <div className="thuoc">
                          <table>
                            <tr>
                              <th colspan="3">
                                <h2>THÔNG TIN BỆNH</h2>
                              </th>
                            </tr>
                          </table>
                          <div>
                            <BootstrapTable
                              keyField="mabenh"
                              data={dataBenh}
                              columns={columnBenh}
                              pagination={paginationFactory()}
                              rowStyle={{ backgroundColor: "#fff" }}
                              wrapperClasses="table-striped"
                              filter={filterFactory()}
                              search
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : isCloseTC == "nav-link pt" ? (
            <div className="textcs">
              <div className="qltn">
                {/* tab */}

                <button
                  className={`buttoncs ${
                    currentTabQLTN === "qltn" ? "active" : ""
                  }`}
                  onClick={() => handleTabClickQLTN("qltn")}
                >
                  QL Nhân viên
                </button>

                <button
                  className={`buttoncs ${
                    currentTabQLTN === "qlbs" ? "active" : ""
                  }`}
                  onClick={() => handleTabClickQLTN("qlbs")}
                >
                  QL Y tá - Bác sĩ
                </button>

                <button
                  className={`buttoncs ${
                    currentTabQLTN === "qlt" ? "active" : ""
                  }`}
                  onClick={() => handleTabClickQLTN("qlt")}
                >
                  Quản lý thuốc
                </button>

                <button
                  className={`buttoncs ${
                    currentTabQLTN === "qlncc" ? "active" : ""
                  }`}
                  onClick={() => handleTabClickQLTN("qlncc")}
                >
                  Quản lý NCC
                </button>

                <button
                  className={`buttoncs ${
                    currentTabQLTN === "qldv" ? "active" : ""
                  }`}
                  onClick={() => handleTabClickQLTN("qldv")}
                >
                  QL Dịch vụ BV
                </button>
              </div>

              {currentTabQLTN === "qltn" && (
                <div className="qlnv">
                  <table>
                    <tr>
                      <th>
                        <h2>DANH SÁCH NHÂN VIÊN</h2>
                      </th>
                    </tr>
                  </table>
                  <div>
                    <BootstrapTable
                      keyField="manv"
                      data={dataNV}
                      columns={columnsNhanVien}
                      pagination={paginationFactory()}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </div>
                </div>
              )}
              {currentTabQLTN === "qlbs" && (
                <div className="qlbs">
                  <table>
                    <tr>
                      <th>
                        <h2>DANH SÁCH Y - BÁC SĨ</h2>
                      </th>
                    </tr>
                  </table>
                  <div>
                    <BootstrapTable
                      keyField="mabs"
                      data={dataBSm}
                      columns={columnsBacSi}
                      pagination={paginationFactory()}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </div>
                </div>
              )}
              {currentTabQLTN === "qlt" && (
                <div className="qlt">
                  <table>
                    <tr>
                      <th colspan="3">
                        <h2>THÔNG TIN THUỐC</h2>
                      </th>
                    </tr>
                  </table>
                  <BootstrapTable
                    keyField="mathuoc"
                    data={dataThuoc}
                    columns={columnThuocAD}
                    pagination={paginationFactory()}
                    rowStyle={{ backgroundColor: "#fff" }}
                    wrapperClasses="table-striped"
                    filter={filterFactory()}
                    search
                  />
                </div>
              )}
            </div>
          ) : isCloseTC == "nav-link tk" ? (
            <div className="textcs">
              <div className="hsba">
                {/* tab */}

                <button
                  className={`buttoncs ${
                    currentTab === "hsba" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("hsba")}
                >
                  Thống kê thuốc
                </button>

                <button
                  className={`buttoncs ${
                    currentTab === "plthuoc" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("plthuoc")}
                >
                  Thống kê hóa đơn
                </button>

                <button
                  className={`buttoncs ${currentTab === "bn" ? "active" : ""}`}
                  onClick={() => handleTabClick("bn")}
                >
                  Thống kê DV
                </button>

                <button
                  className={`buttoncs ${
                    currentTab === "thuoc" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("thuoc")}
                >
                  Thống kê y, thiết bị
                </button>
              </div>
            </div>
          ) : (
            <div className="textcs">Đang phát triển</div>
          )}
        </section>
      )}

      {/* Các modal pop up */}
      <div className="ModalSumary">
        <Modal className="modelcs" isOpen={isOpen} onRequestClose={toggleModal}>
          <table className="tableCenter">
            <tr>
              <th colspan="4">
                <h2>CHI TIẾT HỒ SƠ BỆNH ÁN</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="4">
                <hr style={{ border: "1px solid black" }} />
              </th>
            </tr>
            <tr>
              <th>Mã HSBA: {DataRow ? DataRow.mahsba : ""}</th>
              <th>Mã BN: {DataRow ? DataRow.mabn : ""}</th>
              <th>Tên: {DataRow ? DataRow.ten : ""}</th>
              <th>
                Giới tính: {DataRow ? (DataRow.gioitinh ? "Nam" : "Nữ") : ""}
              </th>
            </tr>
            <tr>
              <th>
                Ngày sinh:{" "}
                {DataRow && DataRow.ngaysinh
                  ? new Date(DataRow.ngaysinh).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>
              <th></th>
              <th>
                Ngày nhập viện:{" "}
                {DataRow && DataRow.ngaybd
                  ? new Date(DataRow.ngaybd).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>
              <th>
                Ngày xuất viện:{" "}
                {DataRow && DataRow.ngaykt
                  ? new Date(DataRow.ngaykt).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>
            </tr>
            <tr>
              <th colspan="4">
                Chuẩn đoán vào viện: {DataRow ? DataRow.cdvaovien : ""}
              </th>
            </tr>
            <tr>
              <th colspan="4">
                Chuẩn đoán ra viện: {DataRow ? DataRow.cdravien : ""}
              </th>
            </tr>
            <tr>
              <th colspan="4">
                Tóm tắt bệnh án:{" "}
                {DataRow
                  ? DataRow.tomtatba.split(".").map((item, index) => (
                      <React.Fragment key={index}>
                        {item}
                        <br />
                      </React.Fragment>
                    ))
                  : ""}
              </th>
            </tr>
            <tr>
              <th colspan="4">Ghi chú: {DataRow ? DataRow.ghichu : ""}</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <button className="buttonModal" onClick={toggleModal}>
                  Đóng
                </button>
              </th>
            </tr>
          </table>
        </Modal>

        <Modal
          className="phieuthuoccs"
          isOpen={phieuThuocPopup}
          onRequestClose={toggleModalPT}
        >
          <BootstrapTable
            keyField="mactpn"
            data={DataPopupPT}
            columns={columsPTPopup}
            pagination={paginationFactory()}
            rowStyle={{ backgroundColor: "#fff" }}
            wrapperClasses="table-striped"
            filter={filterFactory()}
            search
          />
          <table>
            <tr>
              <th>
                <button className="buttonModal" onClick={toggleModalPTpopup}>
                  Đóng
                </button>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </table>
        </Modal>
        <Modal
          className="bhytcs"
          isOpen={isOpenBHYT}
          onRequestClose={toggleBHYT}
        >
          <table className="tableCenter">
            <tr>
              <th colSpan={4}>
                <h2>BẢO HIỂM Y TẾ</h2>
              </th>
            </tr>
            <tr>
              <th>Mã BHYT: </th>
              <th>{DataBHYT ? DataBHYT.mabh : ""}</th>
              <th>Mã loại BH: </th>
              <th>{DataBHYT ? DataBHYT.maloaibh : ""}</th>
            </tr>
            <tr>
              <th>Ngày đóng BH: </th>
              <th>
                {" "}
                {DataBHYT && DataBHYT.ngaydongbh
                  ? new Date(DataBHYT.ngaydongbh).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>
              <th>Địa điểm đk: </th>
              <th>{DataBHYT ? DataBHYT.diadiemdk : ""}</th>
            </tr>
            <tr>
              <th>Ngày bắt đầu BH: </th>
              <th>
                {DataBHYT && DataBHYT.ngaybatdaubh
                  ? new Date(DataBHYT.ngaybatdaubh).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>

              <th>Ngày kết thúc BH: </th>
              <th>
                {DataBHYT && DataBHYT.ngayhethanbh
                  ? new Date(DataBHYT.ngayhethanbh).toLocaleDateString("en-US")
                  : "(trống)"}
              </th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>
                {" "}
                <button className="buttonModal" onClick={toggleBHYT}>
                  Đóng
                </button>
              </th>
            </tr>
          </table>
          <div className="ModalSumary">
            <Modal
              className="modelcs"
              isOpen={isOpen}
              onRequestClose={toggleModal}
            >
              <table className="tableCenter">
                <tr>
                  <th colspan="4">
                    <h2>CHI TIẾT HỒ SƠ BỆNH ÁN</h2>
                  </th>
                </tr>
                <tr>
                  <th colSpan="4">
                    <hr style={{ border: "1px solid black" }} />
                  </th>
                </tr>
                <tr>
                  <th>Mã HSBA: {DataRow ? DataRow.mahsba : ""}</th>
                  <th>Mã BN: {DataRow ? DataRow.mabn : ""}</th>
                  <th>Tên: {DataRow ? DataRow.ten : ""}</th>
                  <th>
                    Giới tính:{" "}
                    {DataRow ? (DataRow.gioitinh ? "Nam" : "Nữ") : ""}
                  </th>
                </tr>
                <tr>
                  <th>
                    Ngày sinh:{" "}
                    {DataRow && DataRow.ngaysinh
                      ? new Date(DataRow.ngaysinh).toLocaleDateString("en-US")
                      : "(trống)"}
                  </th>
                  <th></th>
                  <th>
                    Ngày nhập viện:{" "}
                    {DataRow && DataRow.ngaybd
                      ? new Date(DataRow.ngaybd).toLocaleDateString("en-US")
                      : "(trống)"}
                  </th>
                  <th>
                    Ngày xuất viện:{" "}
                    {DataRow && DataRow.ngaykt
                      ? new Date(DataRow.ngaykt).toLocaleDateString("en-US")
                      : "(trống)"}
                  </th>
                </tr>
                <tr>
                  <th colspan="4">
                    Chuẩn đoán vào viện: {DataRow ? DataRow.cdvaovien : ""}
                  </th>
                </tr>
                <tr>
                  <th colspan="4">
                    Chuẩn đoán ra viện: {DataRow ? DataRow.cdravien : ""}
                  </th>
                </tr>
                <tr>
                  <th colspan="4">
                    Tóm tắt bệnh án:{" "}
                    {DataRow
                      ? DataRow.tomtatba.split(".").map((item, index) => (
                          <React.Fragment key={index}>
                            {item}
                            <br />
                          </React.Fragment>
                        ))
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th colspan="4">Ghi chú: {DataRow ? DataRow.ghichu : ""}</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <button className="buttonModal" onClick={toggleModal}>
                      Đóng
                    </button>
                  </th>
                </tr>
              </table>
            </Modal>

            <Modal
              className="phieuthuoccs"
              isOpen={phieuThuocPopup}
              onRequestClose={toggleModalPT}
            >
              <BootstrapTable
                keyField="mactpn"
                data={DataPopupPT}
                columns={columsPTPopup}
                pagination={paginationFactory()}
                rowStyle={{ backgroundColor: "#fff" }}
                wrapperClasses="table-striped"
                filter={filterFactory()}
                search
              />
              <table>
                <tr>
                  <th>
                    <button
                      className="buttonModal"
                      onClick={toggleModalPTpopup}
                    >
                      Đóng
                    </button>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </table>
            </Modal>

            <Modal className="xoacs" isOpen={isXoa} onRequestClose={xoaThuoc}>
              <table className="tablexoacs">
                <tr>
                  <th colSpan={2}>
                    <h2> Bạn có muốn xóa ?</h2>
                  </th>
                </tr>
                <tr>
                  <th>
                    <button className="buttonModal" onClick={handleXoaRowPT}>
                      Có
                    </button>
                  </th>
                  <th>
                    <button className="buttonModal" onClick={xoaThuoc}>
                      Không
                    </button>
                  </th>
                </tr>
              </table>
            </Modal>
          </div>
        </Modal>
        <Modal className="xoacs" isOpen={isXoa} onRequestClose={xoaThuoc}>
          <table className="tablexoacs">
            <tr>
              <th colSpan={2}>
                <h2> Bạn có muốn xóa ?</h2>
              </th>
            </tr>
            <tr>
              <th>
                <button className="buttonModal" onClick={handleXoaRowPT}>
                  Có
                </button>
              </th>
              <th>
                <button className="buttonModal" onClick={xoaThuoc}>
                  Không
                </button>
              </th>
            </tr>
          </table>
        </Modal>

        <Modal
          className="suapt"
          isOpen={isOpenEditPt}
          onRequestClose={toggleModalEditPt}
        >
          <table>
            <tr>
              <th colSpan={4}>
                <h2> SỬA ĐƠN THUỐC </h2>
              </th>
            </tr>

            <tr>
              <th>Mã PT: </th>
              <th>{DataRowTamPTSua ? DataRowTamPTSua.mactpn : ""}</th>
              <th>Mã CTPT: </th>
              <th>{DataRowTamPTSua ? DataRowTamPTSua.maphieuthuoc : ""}</th>
            </tr>

            <tr>
              <th>Tên thuốc: </th>
              <th>
                <Select
                  options={dataThuoc.map((thuoc) => ({
                    value: thuoc.mathuoc,
                    label: thuoc.tenthuoc,
                  }))}
                  value={selectedOption}
                  onChange={handleSelectChange}
                  placeholder={tenthuoc}
                />
              </th>
              <th>Số lượng: </th>
              <th>
                <input
                  type="number"
                  value={soluong}
                  onChange={handleThayDoiSoLuong}
                />
              </th>
            </tr>

            <tr>
              <th></th>
              <th></th>
              <th>
                <button className="buttonModal" onClick={handleLuuPT}>
                  Lưu
                </button>
              </th>
              <th>
                <button className="buttonModal" onClick={toggleModalEditPt}>
                  Không
                </button>
              </th>
            </tr>
          </table>
        </Modal>

        <Modal
          className="kethuoc"
          isOpen={kethuoc}
          onRequestClose={handleTatThemThuoc}
        >
          <table className="kethuoccs">
            <thead>
              <tr>
                <th colSpan={6} style={{ textAlign: "center" }}>
                  <h2>KÊ THUỐC CHO BỆNH NHÂN</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Mã phiếu thuốc: </th>
                <th>
                  <input
                    value={themmaphieuthuoc}
                    disabled
                    style={{ width: "80px" }}
                  />
                </th>
                <th>Ngày kê thuốc: </th>
                <th>{ngayhientai}</th>
                <th style={{ textAlign: "center" }}>Bác sĩ: </th>
                <th>{currentUser.ten}</th>
              </tr>
              <tr>
                <th>Mã bệnh nhân: </th>
                <th>
                  <Select
                    options={databnSelect}
                    value={selectedPatient}
                    onChange={handleSelectMaBenhNhan}
                  />
                </th>
                <th>Tên bệnh nhân: </th>
                <th>
                  <span>{selectedPatientName.ten}</span>
                </th>
                <th></th>
                <th></th>
              </tr>
              {rows.map((row, index) => (
                <tr key={index}>
                  <th>Tên thuốc: </th>
                  <th colSpan={2}>
                    <Select
                      options={dataThuoc.map((thuoc) => ({
                        value: thuoc.mathuoc, // Giả sử thuoc.mathuoc là ID của thuốc
                        label: thuoc.tenthuoc,
                      }))}
                      value={selectedOptionThuoc && selectedOptionThuoc[index]}
                      defaultValue={
                        selectedOptionThuoc && selectedOptionThuoc[index]
                      }
                      onChange={(selectedOption) => {
                        handleSelectChangeThuoc(selectedOption); // Cập nhật selectedOptionThuoc
                        handleThayDoiTenThuocct(selectedOption, index);
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      placeholder="Chọn thuốc"
                    />
                  </th>
                  <th>Số lượng: </th>
                  <th colSpan={2}>
                    <input
                      type="number"
                      value={row.soLuong}
                      onChange={(e) =>
                        handleThayDoiSoLuongct(e.target.value, index)
                      }
                    />
                  </th>
                </tr>
              ))}
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <button className="buttonModal" onClick={handleAddRow}>
                    <h2>+</h2>
                  </button>
                </th>
                <th>
                  <button className="buttonModal" onClick={handleLuuKeThuoc}>
                    Lưu
                  </button>
                </th>
                <th>
                  <button className="buttonModal" onClick={handleTatThemThuoc}>
                    Không
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </Modal>

        <Modal
          className="thanhtoan"
          isOpen={thanhToan}
          onRequestClose={togglesetThanhToan}
        >
          <div className="modal-content">
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th colSpan={6}>
                    <h2>THÔNG TIN CHI TIẾT BỆNH NHÂN</h2>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th style={{ width: "170px" }}>Mã bệnh nhân: </th>
                  <th>{maBNThanhToan}</th>
                  <th style={{ width: "150px" }}>Tên bệnh nhân:</th>
                  <th style={{ width: "140px" }}>{tenBNThanhToan}</th>
                  <th>Mã bảo hiểm: </th>
                  <th>{maBHBNThanhToan}</th>
                </tr>
                <tr>
                  <th>Mã biên lai: </th>
                  <th>{maBLThanhToan}</th>
                  <th>Ngày hiện tại: </th>
                  <th>{ngayhientai}</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Dịch vụ đã sử dụng: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="madv"
                      data={dvbnsd}
                      columns={columnsdvsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th>Phiếu thuốc: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="mathuoc"
                      data={tbnsd}
                      columns={columnsptbnsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th>Phiếu xét nghiệm: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="maloaixn"
                      data={pxnbnsd}
                      columns={columnspxnbnsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <button className="buttonModal" onClick={handleTT}>
                      Thanh toán
                    </button>
                  </th>
                  <th>
                    <button
                      className="buttonModal"
                      onClick={togglesetThanhToan}
                    >
                      Thoát
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </Modal>

        <Modal
          className="thanhtoanct"
          isOpen={thanhToanTT}
          onRequestClose={togglesetThanhToanTT}
        >
          <div className="modal-content">
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th colSpan={2}>
                    <h2>THANH TOÁN</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Chi phí dịch vụ: </th>
                  <th style={{ textAlign: "right" }}>{bill.tiendvcg} đ</th>
                </tr>
                <tr>
                  <th>Chi phí thuốc: </th>
                  <th style={{ textAlign: "right" }}>{bill.tienthuoc} đ</th>
                </tr>
                <tr>
                  <th>Chi phí xét nghiệm: </th>
                  <th style={{ textAlign: "right" }}>{bill.tienxn} đ</th>
                </tr>
                <tr>
                  <th>Bảo hiểm hổ trợ: </th>
                  <th style={{ textAlign: "right" }}>{bill.tienbh} đ</th>
                </tr>
                <tr>
                  <th>Chi phí tổng kết: </th>
                  <th style={{ textAlign: "right" }}>
                    {bill.tiendvcg + bill.tienthuoc + bill.tienxn - bill.tienbh}{" "}
                    đ
                  </th>
                </tr>
              </tbody>
            </table>
            <table style={{ paddingTop: "50px" }}>
              <tr>
                <th style={{ textAlign: "right" }}>
                  <button
                    className="buttonModal"
                    onClick={() => xacnhantt(maBLThanhToan)}
                  >
                    Thanh toán
                  </button>
                  <button
                    className="buttonModal"
                    onClick={togglesetThanhToanTT}
                  >
                    Thoát
                  </button>
                </th>
              </tr>
            </table>
          </div>
        </Modal>

        <Modal
          className="thanhtoancn"
          isOpen={thanhToancn}
          onRequestClose={togglesetThanhToancn}
        >
          <div className="modal-content">
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th colSpan={6}>
                    <h2>THÔNG TIN CHI TIẾT BỆNH NHÂN</h2>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th style={{ width: "170px" }}>Mã bệnh nhân: </th>
                  <th>{maBNThanhToan}</th>
                  <th style={{ width: "150px" }}>Tên bệnh nhân:</th>
                  <th style={{ width: "140px" }}>{tenBNThanhToan}</th>
                  <th>Mã bảo hiểm: </th>
                  <th>{maBHBNThanhToan}</th>
                </tr>
                <tr>
                  <th>Mã biên lai: </th>
                  <th>{maBLThanhToan}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Dịch vụ đã sử dụng: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="madv"
                      data={dvbnsd}
                      columns={columnsdvsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th>Phiếu thuốc: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="mathuoc"
                      data={tbnsd}
                      columns={columnsptbnsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th>Phiếu xét nghiệm: </th>
                </tr>
                <tr>
                  <th colSpan={6}>
                    <BootstrapTable
                      keyField="maloaixn"
                      data={pxnbnsd}
                      columns={columnspxnbnsd}
                      rowStyle={{ backgroundColor: "#fff" }}
                      wrapperClasses="table-striped"
                      filter={filterFactory()}
                      search
                    />
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <button
                      className="buttonModal"
                      onClick={togglesetThanhToancn}
                    >
                      Thoát
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </Modal>
        <Modal className="lk" isOpen={isOpenLK} onRequestClose={closeModal}>
          <table>
            <tr>
              <th>
                <button className="buttonModal" onClick={() => khamxong(makx)}>
                  Khám xong
                </button>
              </th>
              <th>
                <button className="buttonModal" onClick={() => khamxong(makx)}>
                  Hủy lịch khám
                </button>
              </th>
              <th>
                <button className="buttonModal" onClick={closeModal}>
                  Đóng
                </button>
              </th>
            </tr>
          </table>
        </Modal>
      </div>
    </mainBody>
  );
}

export default MainApp;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
