using System;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuSearchThanhLyInput
    {
        public int? ThanhLyVatTu_Ma { get; set; }
        public int? ThanhLyVatTu_MaVatTu { get; set; }
        public string ThanhLyVatTu_TenVatTu { get; set; }
        public long? ThanhLyVatTu_SoTienThanhLy { get; set; }
        public int? ThanhLyVatTu_SoLuong { get; set; }
        public string ThanhLyVatTu_LyDo { get; set; }
        public string ThanhLyVatTu_NguoiTao { get; set; }
    }
}
