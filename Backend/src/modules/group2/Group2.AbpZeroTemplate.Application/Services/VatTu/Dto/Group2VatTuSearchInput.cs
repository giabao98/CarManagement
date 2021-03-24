using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuSearchInput
    {
        public int? VatTu_Ma { get; set; }
        public string VatTu_Ten { get; set; }
        public int? VatTu_SoLuong { get; set; }
        public double? VatTu_DonGia { get; set; }
        public double? VatTu_TongGia { get; set; }
        public string VatTu_TrangThai { get; set; }
    }
}
