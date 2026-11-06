# VINHDAT AI Filter integration

Nguồn tham khảo: filterclassic.js và testfilter.js trong locketgold_tool-main.zip.

- Giữ nguyên scripts/forceGold4.3.js, locketfix8.js, header7.js và thư mục Spotify.
- Thêm scripts/aiFilterVINHDAT.js, tích hợp trong .conf và .sgmodule.
- Không sao chép chức năng gửi UID/username lên Worker bên thứ ba, không thay mã lỗi HTTP thành 200.
- Chỉ thay đổi metadata filter trong phản hồi JSON nếu tồn tại các trường phù hợp. Không tự tạo ảnh AI, không đảm bảo mở khóa AI hoặc gỡ mờ ảnh thực tế.
- Script URL trong .conf/.sgmodule cần được push lên GitHub vdatdv/LocketGold nhánh main trước khi hoạt động.
- Pattern api.locketcamera.com là phạm vi thử nghiệm; cần kiểm tra endpoint thực tế và điều chỉnh để tránh bắt nhầm phản hồi khác.
- Khi thử nghiệm, bật MITM và chứng chỉ tin cậy trong Shadowrocket; tắt quy tắc này nếu gây lỗi.
