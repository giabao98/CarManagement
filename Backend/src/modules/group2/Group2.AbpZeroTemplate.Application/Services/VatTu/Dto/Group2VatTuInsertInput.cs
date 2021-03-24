using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuInsertInput
    {
        public string VatTu_Ten { get; set; }
        public int? VatTu_SoLuong { get; set; }
        public string VatTu_MoTa { get; set; }
        public double? VatTu_DonGia { get; set; }
        public string VatTu_NguoiTao { get; set; }
    }
}
