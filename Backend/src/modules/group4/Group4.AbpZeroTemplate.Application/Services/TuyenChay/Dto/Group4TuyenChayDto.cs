using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group4.AbpZeroTemplate.Web.Core.Services.TuyenChay.Dto
{
    public class Group4TuyenChayDto
    {
        public int? Ma { get; set; }
        
        public string TuyenChay_DiemDi { get; set; }

        public string TuyenChay_DiemDen { get; set; }

        public float? TuyenChay_SoKm { get; set; }

        public string TuyenChay_NguoiTao { get; set; }

        public DateTime? TuyenChay_NgayTao { get; set; }

        public string TuyenChay_TrangThaiDuyet { get; set; }
        public string TuyenChay_MucDich { get; set; }
        public string TuyenChay_LiDoTuChoi { get; set; }
        public DateTime? TuyenChay_NgayDuyet { get; set; }
        public string TuyenChay_NguoiDuyet { get; set; }

        public float? TuyenChay_SoKmBatDau { get; set; }
        public float? TuyenChay_SoKmKetThuc { get; set; }
    }
}
