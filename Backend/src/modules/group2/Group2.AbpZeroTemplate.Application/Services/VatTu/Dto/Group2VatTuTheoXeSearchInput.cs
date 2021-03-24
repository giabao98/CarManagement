using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuTheoXeSearchInput
    {
        public int? Xe_MaLoaiXe { get; set; }
        public string Xe_BienSo { get; set; }
        public int? VatTu_Ma { get; set; }
    }
}
