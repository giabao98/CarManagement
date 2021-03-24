using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2VatTuTheoXeSearch
    {
        public int? Ma { get; set; }
        public int? Xe_MaLoaiXe { get; set; }
        public string LoaiXe_Ten { get; set; }
        public string Xe_Ten { get; set; }
        public long? Xe_Gia { get; set; }
        public string Xe_BienSo { get; set; }
    }
}
