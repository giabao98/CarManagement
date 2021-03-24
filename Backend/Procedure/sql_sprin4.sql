Use DbPratice
CREATE TABLE [dbo].[HoatDongTaiXe]
(
 [Ma]							int NOT NULL IDENTITY(1,1) ,
 [HoatDongTaiXe_MaLinhTrinh]	int  NULL ,
 [HoatDongTaiXe_KmThucTe]		float NULL ,
 [HoatDongTaiXe_NgayTao]		datetime NULL ,
 [HoatDongTaiXe_NguoiTao]		nvarchar(max) NULL ,
 [HoatDongTaiXe_NhienLieu]		float NULL ,
 [HoatDongTaiXe_KmUocTinh]		float NULL ,
 [HoatDongTaiXe_TrangThai]		varchar(1) NULL ,

 CONSTRAINT [PK_HoatDongTaiXe] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO

CREATE TABLE [dbo].[ThanhLyVatTu]
(
 [Ma]							int NOT NULL IDENTITY(1,1) ,
 [ThanhLyVatTu_MaVatTu]			int  NULL ,
 [ThanhLyVatTu_NgayThanhLy]		datetime NULL ,
 [ThanhLyVatTu_NgayTao]			datetime NULL ,
 [ThanhLyVatTu_NguoiTao]		nvarchar(max) NULL ,

 CONSTRAINT [PK_ThanhLyVatTu] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO

CREATE TABLE [dbo].[VatTu]
(
 [Ma]					int NOT NULL IDENTITY(1,1) ,
 [VatTu_Ten]			nvarchar(max)  NULL ,
 [VatTu_SoLuong]		int NULL ,
 [VatTu_MoTa]			nvarchar(max) NULL ,
 [VatTu_DonGia]			float NULL ,
 [VatTu_TongGia]		float NULL ,
 [VatTu_NgayTao]		datetime NULL ,
 [VatTu_NguoiTao]		nvarchar(max) NULL ,
 [VatTu_TrangThai]		varchar(1) NULL ,
 CONSTRAINT [PK_VatTu] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO

CREATE TABLE [dbo].[ThongKe]
(
 [Ma]					int NOT NULL IDENTITY(1,1) ,
 [ThongKe_MaXe]			nvarchar(max)  NULL ,
 [ThongKe_TongKm]		float NULL ,
 [ThongKe_NguoiTao]		nvarchar(max) NULL ,
 [ThongKe_NgayTao]		datetime NULL ,
 CONSTRAINT [PK_ThongKe] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
CREATE TABLE [dbo].[VatTu]
(
 [Ma]					int NOT NULL IDENTITY(1,1) ,
 [VatTu_Ten]			nvarchar(max)  NULL ,
 [VatTu_SoLuong]		int NULL ,
 [VatTu_MoTa]			nvarchar(max) NULL ,
 [VatTu_DonGia]			float NULL ,
 [VatTu_TongGia]		float NULL ,
 [VatTu_NgayTao]		datetime NULL ,
 [VatTu_NguoiTao]		nvarchar(max) NULL ,
 [VatTu_TrangThai]		varchar(1) NULL ,
 CONSTRAINT [PK_VatTu] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO
CREATE TABLE [dbo].[ThueXe]
(
 [Ma]					int NOT NULL IDENTITY(1,1) ,
 [ThueXe_TenXe]			nvarchar(max)  NULL ,
 [ThueXe_NamSanXuat]	int NULL ,
 [ThueXe_Hang]			nvarchar(max) NULL ,
 [ThueXe_Mau]			nvarchar(max) NULL ,
 [ThueXe_MaDonViThue]	int NULL ,
 [ThueXe_GiaThueXe]		bigint NULL ,
 [ThueXe_LoaiHinhThue]	varchar(1) NULL,
 [ThueXe_LyDoThue]		nvarchar(max) NULL,
 [ThueXe_MucDich]		nvarchar(max)  NULL ,
 [ThueXe_NgayDi]		datetime NULL,
 [ThueXe_NgayVe]		datetime NULL,
 [ThueXe_SoCho]			int NULL,
 [ThueXe_SoLuong]		int NULL ,
 [ThueXe_TrangThai]		varchar(1) NULL ,
 [ThueXe_LyDoTuChoi]	nvarchar(max) NULL ,
 
 CONSTRAINT [PK_ThueXe] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO
CREATE TABLE [dbo].[DonViThue]
(
 [Ma]						int NOT NULL IDENTITY(1,1) ,
 [DonViThue_Quan]			nvarchar(max)  NULL ,
 [DonViThue_ThanhPho]		nvarchar(max)  NULL ,
 [DonViThue_Ten]			nvarchar(max) NULL ,
 [DonViThue_Sdt]			nvarchar(max) NULL ,
 [DonViThue_DiaChi]			nvarchar(max) NULL ,

 CONSTRAINT [PK_DonViThue] PRIMARY KEY CLUSTERED ([Ma] ASC)
);
GO


ALTER TABLE  TuyenChay ADD
FOREIGN KEY (TuyenChay_MaXe) REFERENCES Xe(Ma);

ALTER TABLE HoatDongTaiXe ADD 
FOREIGN KEY(HoatDongTaiXe_MaLichTrinh) REFERENCES LichTrinh(Ma);

ALTER TABLE ThanhLyVatTu ADD 
FOREIGN KEY(ThanhLyVatTu_MaVatTu) REFERENCES VatTu(Ma);

ALTER TABLE ThongKe ADD 
FOREIGN KEY(ThongKe_MaXe) REFERENCES Xe(Ma);

Use DbPratice
ALTER TABLE HoatDongTaiXe ADD
FOREIGN KEY(Ma) REFERENCES TuyenChay(Ma)

ALTER TABLE PhiDuongBo DROP COLUMN PhiDuongBo_TinhTrang;
ALTER TABLE ThueXe ADD
FOREIGN KEY(ThueXe_MaDonViThue) REFERENCES DonViThue(Ma);

--- Update nhóm 9
ALTER TABLE LichTrinh ADD LichTrinh_MaXe int NULL
ALTER TABLE LichTrinh ADD 
FOREIGN KEY (LichTrinh_MaXe) REFERENCES Xe(Ma);

-- fix thong ke
ALTER TABLE ThongKe ALTER COLUMN ThongKe_MaXe int NULL
