using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuThanhLyInput
    {
        public int? ThanhLyVatTu_MaVatTu { get; set; }
        public long? ThanhLyVatTu_SoTienThanhLy { get; set; }
        public int? ThanhLyVatTu_SoLuong { get; set; }
        public string ThanhLyVatTu_LyDo { get; set; }
        public string ThanhLyVatTu_NguoiTao { get; set; }
    }
}
