
using System;

namespace Group9.AbpZeroTemplate.Application.Share.Group9.Dto
{
  public class Group9BaoTriDto
  {
        public int? Ma { get; set; }
        public DateTime? BaoTri_NgayBaoTri { get; set; }
        public string BaoTri_NoiBaoTri { get; set; }
        public DateTime? BaoTri_NgayXuatXuong { get; set; }
        public long? BaoTri_ThanhTien { get; set; }
        public string BaoTri_TinhTrangBaoTri { get; set; }
        public int? BaoTri_MaXe { get; set; }
        public int? BaoTri_MaTaiXe { get; set; }
        public string BaoTri_NguoiTao { get; set; }
        public DateTime? BaoTri_NgayTao { get; set; }
        public string BaoTri_TrangThai { get; set; }
        public string BaoTri_GhiChu { get; set; }
        public string BaoTri_SoHoaDon { get; set; }
    }
}
