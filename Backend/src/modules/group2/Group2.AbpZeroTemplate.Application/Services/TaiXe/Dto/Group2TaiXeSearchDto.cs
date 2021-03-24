using System;
using System.ComponentModel.DataAnnotations;

namespace Group2.AbpZeroTemplate.Application.Share.Group2.Dto
{
    public class Group2TaiXeSearchDto
    {
        public int? Ma { get; set; }
        public string TaiXe_HoTen { get; set; }
        public string TaiXe_TrangThaiLamViec { get; set; }
        public string TaiXe_HangBangLai { get; set; }
        public long? HopDong_MucLuong { get; set; }
        public DateTime? HopDong_NgayBatDauLam { get; set; }
        public DateTime? HopDong_NgayHetHan { get; set; }
        public DateTime? HopDong_NgayDongBaoHiem { get; set; }
        public string HopDong_TrangThai { get; set; }
        public string TaiXe_UrlAnh { get; set; }
        public string TaiXe_UrlThongTin { get; set; }
    }
}
