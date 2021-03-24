-------------------[dbo].[Group9BaoTri_Insert] 6/17/2020----------------
create proc [dbo].[BAOTRI_Group9Insert]
    @BaoTri_NgayBaoTri      datetime NULL ,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL ,
	@BaoTri_SoHoaDon        nvarchar(50) NULL 

as

if(exists(select * from BaoTri where BaoTri_SoHoaDon = @BaoTri_SoHoaDon and BaoTri_TrangThai = 'N'))
begin
	select '1' as Result, N' đã tồn tại trong hệ thống' as ErrorDesc
	return
end
else

begin transaction
begin try

	INSERT INTO [dbo].[BaoTri]
    ( 
		[BaoTri_NgayBaoTri],
		[BaoTri_NoiBaoTri]     ,
		[BaoTri_NgayXuatXuong]   ,
		[BaoTri_ThanhTien]    ,
		[BaoTri_TinhTrangBaoTri] ,
		[BaoTri_MaXe]             ,
		[BaoTri_MaTaiXe]          ,
		[BaoTri_NguoiTao]       ,
		[BaoTri_NgayTao]    ,
		[BaoTri_TrangThai]      ,
		[BaoTri_GhiChu]        ,
		[BaoTri_SoHoaDon]      )
	VALUES
    (   
		@BaoTri_NgayBaoTri      ,
		@BaoTri_NoiBaoTri     ,
		@BaoTri_NgayXuatXuong  ,
		@BaoTri_ThanhTien       ,
		'C',
		@BaoTri_MaXe           ,
		@BaoTri_MaTaiXe      ,
		@BaoTri_NguoiTao   ,
		@BaoTri_NgayTao         ,
		'N'    ,
		@BaoTri_GhiChu         ,
		@BaoTri_SoHoaDon   )
	declare @Ma int = SCOPE_IDENTITY()
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

-------------------[dbo].[Group9BaoTri_Update] 6/17/2020----------------

create proc [dbo].[BAOTRI_Group9Update]
    @Ma int = NULL,
    @BaoTri_NgayBaoTri      datetime NULL ,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL ,
	@BaoTri_SoHoaDon        nvarchar(50) NULL 

as

if(not exists(select * from BaoTri where Ma = @Ma))
begin
	select '1' as Result, N'Dữ liệu không tồn tại trong hệ thống' as ErrorDesc
	RETURN
end
begin transaction
begin try

	UPDATE [dbo].[BaoTri]
	   SET [BaoTri_NgayBaoTri] = @BaoTri_NgayBaoTri
		  ,[BaoTri_NoiBaoTri] = @BaoTri_NoiBaoTri
		  ,[BaoTri_NgayXuatXuong] = @BaoTri_NgayXuatXuong
		  ,[BaoTri_ThanhTien] = @BaoTri_ThanhTien 
		  ,[BaoTri_TinhTrangBaoTri] = @BaoTri_TinhTrangBaoTri
		  ,[BaoTri_MaXe] = @BaoTri_MaXe
		  ,[BaoTri_MaTaiXe] = @BaoTri_MaTaiXe
		  ,[BaoTri_NguoiTao] = @BaoTri_NguoiTao
		  ,[BaoTri_NgayTao] = @BaoTri_NgayTao
		  ,[BaoTri_TrangThai] = @BaoTri_TrangThai
		  ,[BaoTri_GhiChu] = @BaoTri_GhiChu 
		  ,[BaoTri_SoHoaDon] = @BaoTri_SoHoaDon 
	WHERE Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch


-------------------[dbo].[Group9BaoTri_ById] 6/17/2020----------------

create proc [dbo].[BAOTRI_Group9ById]
    @Ma int = NULL
as
begin
select *
from BaoTri
where Ma = @Ma and BaoTri_TrangThai = 'N'
end

-------------------[dbo].[Group9BaoTri_SearchAll] 6/17/2020----------------
create proc [dbo].[BAOTRI_Group9SearchAll]
as
begin
select *
from BaoTri
where BaoTri_TrangThai = 'N'
end

-------------------[dbo].[Group9BaoTri_Search] 6/17/2020----------------
create proc [dbo].[BAOTRI_Group9Search] 
 @Ma int = NULL,
    @BaoTri_NgayBaoTri      datetime NULL ,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL ,
	@BaoTri_SoHoaDon        nvarchar(50) NULL 
as
begin
	select * from BaoTri
	where (@Ma is null or Ma = @Ma)
	and (@BaoTri_NgayBaoTri is null or BaoTri_NgayBaoTri = @BaoTri_NgayBaoTri)
	and (@BaoTri_NoiBaoTri is null or BaoTri_NoiBaoTri = @BaoTri_NoiBaoTri)
	and (@BaoTri_NgayXuatXuong is null or BaoTri_NgayXuatXuong = @BaoTri_NgayXuatXuong)
	and (@BaoTri_ThanhTien is null or BaoTri_ThanhTien = @BaoTri_ThanhTien)
	and (@BaoTri_TinhTrangBaoTri is null or BaoTri_TinhTrangBaoTri = @BaoTri_TinhTrangBaoTri)
	and (@BaoTri_MaXe is null or BaoTri_MaXe = @BaoTri_MaXe)
	and (@BaoTri_MaTaiXe is null or BaoTri_MaTaiXe = @BaoTri_MaTaiXe)
	and (@BaoTri_NguoiTao is null or BaoTri_NguoiTao = @BaoTri_NguoiTao)
	and (@BaoTri_NgayTao is null or BaoTri_NgayTao = @BaoTri_NgayTao)
	and (@BaoTri_TrangThai is null or BaoTri_TrangThai = @BaoTri_TrangThai)
	and (@BaoTri_GhiChu is null or BaoTri_GhiChu = @BaoTri_GhiChu)
	and (@BaoTri_SoHoaDon is null or BaoTri_SoHoaDon = @BaoTri_SoHoaDon)
	and (BaoTri_TrangThai = 'N')

end

-------------------[dbo].[Group9BaoTri_Delete] 6/17/2020----------------
create proc [dbo].[BAOTRI_Group9Delete] @Ma int = NULL
as

if(exists(select * from BaoTri where BaoTri_TinhTrangBaoTri = 'D' and Ma = @Ma))
begin
	select '1' as Result, N'Xe đang bảo trì không được xóa' as ErrorDesc
	return
end
begin transaction
begin try
	update BaoTri set BaoTri_TrangThai = 'X' where Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
