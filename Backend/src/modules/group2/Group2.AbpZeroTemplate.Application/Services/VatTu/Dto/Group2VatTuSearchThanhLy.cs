using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuSearchThanhLy
    {
        public int? Ma { get; set; }
        public int? ThanhLyVatTu_MaVatTu { get; set; }
        public string VatTu_Ten { get; set; }
        public DateTime? ThanhLyVatTu_NgayThanhLy { get; set; }
        public DateTime? ThanhLyVatTu_NgayTao { get; set; }
        public string ThanhLyVatTu_NguoiTao { get; set; }
        public long? ThanhLyVatTu_SoTienThanhLy { get; set; }
        public int? ThanhLyVatTu_SoLuong { get; set; }
        public string ThanhLyVatTu_LyDo { get; set; }
    }
}
