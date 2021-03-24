USE [DbPratice]
GO
--Them VatTu
create or ALTER Proc VATTU_Group2Insert
@VatTu_Ten nvarchar(max) = null,
@VatTu_SoLuong int = null,
@VatTu_MoTa nvarchar(max) = null,
@VatTu_DonGia float = null,
@VatTu_NguoiTao nvarchar(max) = null
as

begin transaction
begin try
	insert into VatTu
		(VatTu_Ten,
		VatTu_SoLuong,
		VatTu_MoTa,
		VatTu_DonGia,
		VatTu_TongGia,
		VatTu_NgayTao,
		VatTu_NguoiTao,
		VatTu_TrangThai)
	values
		(@VatTu_Ten,
		@VatTu_SoLuong,
		@VatTu_MoTa,
		@VatTu_DonGia,
		@VatTu_DonGia*@VatTu_SoLuong,
		GETDATE(),
		@VatTu_NguoiTao,
		'N')
	declare @ma int = scope_identity()
	
	Update VatTu
	set VatTu_TrangThai = 'X'
	Where Ma = @Ma and (@VatTu_SoLuong < 1)
commit transaction
	select '0' as Result, N'Thêm thông tin vật tư thành công' as ErrorDesc, @ma as Ma
end try
begin catch
rollback transaction
end catch
go
--Chinh sua VatTu
CREATE or ALTER Proc VATTU_Group2Update
@Ma int = null,
@VatTu_Ten nvarchar(max) = null,
@VatTu_SoLuong int = null,
@VatTu_MoTa nvarchar(max) = null,
@VatTu_DonGia float = null,
@VatTu_NguoiTao nvarchar(max) = null
as

begin transaction
begin try
	UPDATE VatTu
	SET VatTu_Ten = @VatTu_Ten,
		VatTu_SoLuong = @VatTu_SoLuong,
		VatTu_MoTa = @VatTu_MoTa,
		VatTu_DonGia = @VatTu_DonGia,
		VatTu_TongGia = @VatTu_DonGia*@VatTu_SoLuong,
		VatTu_NguoiTao = @VatTu_NguoiTao,
		VatTu_NgayTao = GETDATE(),
		VatTu_TrangThai = 'N'
	WHERE Ma = @Ma
	
	Update VatTu
	set VatTu_TrangThai = 'X'
	Where Ma = @Ma and (@VatTu_SoLuong < 1)
commit transaction
	select '0' as Result, N'Đã Update thông tin' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
go
--Search VatTu
create or alter proc VATTU_Group2Search
@VatTu_Ma int = null,
@VatTu_Ten nvarchar(max) = null,
@VatTu_SoLuong int = null,
@VatTu_DonGia float = null,
@VatTu_TongGia float = null,
@VatTu_TrangThai varchar(1) = null
as
begin
	select  Ma, VatTu_Ten, VatTu_SoLuong, VatTu_MoTa, VatTu_DonGia, VatTu_TongGia, VatTu_TrangThai, VatTu_NgayTao
	from VatTu
	where
	(@VatTu_Ma is null or Ma = @VatTu_Ma) and
	(@VatTu_Ten is null or @VatTu_Ten = '' or VatTu_Ten like '%' + @VatTu_Ten + '%') and
	(@VatTu_SoLuong is null or VatTu_SoLuong = @VatTu_SoLuong) and
	(@VatTu_DonGia is null or VatTu_DonGia = @VatTu_DonGia) and
	(@VatTu_TongGia is null or VatTu_TongGia = @VatTu_TongGia) and
	(@VatTu_TrangThai is null or @VatTu_TrangThai = '' or VatTu_TrangThai like '%' + @VatTu_TrangThai + '%')
end
Go
--SearchById VatTu
create or alter proc VATTU_Group2SearchById
@VatTu_Ma int = null
as
begin
	select  Ma, VatTu_Ten, VatTu_SoLuong, VatTu_MoTa, VatTu_DonGia, VatTu_TongGia, VatTu_TrangThai, VatTu_NgayTao
	from VatTu
	where
	(@VatTu_Ma is null or Ma = @VatTu_Ma) and
	(VatTu_TrangThai != 'X')
end
Go
--Thanh Ly VatTu
create or alter proc VATTU_Group2ThanhLy
@ThanhLyVatTu_MaVatTu int = null,
@ThanhLyVatTu_SoTienThanhLy bigint = null,
@ThanhLyVatTu_SoLuong int = null,
@ThanhLyVatTu_LyDo nvarchar(max) = null,
@ThanhLyVatTu_NguoiTao nvarchar(max) = null
as
begin transaction
begin try
	Insert into ThanhLyVatTu
		(ThanhLyVatTu_MaVatTu,
		ThanhLyVatTu_NgayThanhLy,
		ThanhLyVatTu_NgayTao,
		ThanhLyVatTu_NguoiTao,
		ThanhLyVatTu_SoTienThanhLy,
		ThanhLyVatTu_SoLuong,
		ThanhLyVatTu_LyDo)
	values
		(@ThanhLyVatTu_MaVatTu,
		GETDATE(),
		GETDATE(),
		@ThanhLyVatTu_NguoiTao,
		@ThanhLyVatTu_SoTienThanhLy,
		@ThanhLyVatTu_SoLuong,
		@ThanhLyVatTu_LyDo)

	update VatTu
	set VatTu_SoLuong = VatTu_SoLuong - @ThanhLyVatTu_SoLuong, VatTu_TongGia = VatTu_DonGia * VatTu_SoLuong
	from VatTu VT inner join ThanhLyVatTu TLVT
	on VT.Ma = TLVT.ThanhLyVatTu_MaVatTu 
	where VT.Ma = @ThanhLyVatTu_MaVatTu

	update VatTu
	set VatTu_TrangThai = 'X'
	from VatTu VT inner join ThanhLyVatTu TLVT
	on VT.Ma = TLVT.ThanhLyVatTu_MaVatTu 
	where VT.Ma = @ThanhLyVatTu_MaVatTu and VT.VatTu_SoLuong < 1


commit transaction
	select '0' as Result, N'Đã thanh lý!' as ErrorDesc, @ThanhLyVatTu_MaVatTu as Ma
end try
begin catch

rollback transaction

end catch
go
-- Search Thanh Ly VatTu
create or alter proc VATTU_Group2ThanhLySearch
@ThanhLyVatTu_Ma int = null,
@ThanhLyVatTu_MaVatTu int = null,
@ThanhLyVatTu_SoTienThanhLy bigint = null,
@ThanhLyVatTu_SoLuong int = null,
@ThanhLyVatTu_LyDo nvarchar(max),
@ThanhLyVatTu_NguoiTao nvarchar(max) = null
as
begin
	select Ma, ThanhLyVatTu_MaVatTu, ThanhLyVatTu_NgayThanhLy, ThanhLyVatTu_NgayTao, ThanhLyVatTu_NguoiTao, ThanhLyVatTu_SoTienThanhLy, ThanhLyVatTu_SoLuong, ThanhLyVatTu_LyDo
	from ThanhLyVatTu
	where
		(@ThanhLyVatTu_Ma is null or Ma = @ThanhLyVatTu_Ma) and
		(@ThanhLyVatTu_MaVatTu is null or ThanhLyVatTu_MaVatTu = @ThanhLyVatTu_MaVatTu) and
		(@ThanhLyVatTu_SoTienThanhLy is null or ThanhLyVatTu_SoTienThanhLy = @ThanhLyVatTu_SoTienThanhLy) and
		(@ThanhLyVatTu_SoLuong is null or ThanhLyVatTu_SoLuong = @ThanhLyVatTu_SoLuong) and
		(@ThanhLyVatTu_LyDo is null or @ThanhLyVatTu_LyDo = '' or ThanhLyVatTu_LyDo like '%' + @ThanhLyVatTu_LyDo + '%') and
		(@ThanhLyVatTu_NguoiTao is null or @ThanhLyVatTu_NguoiTao = '' or ThanhLyVatTu_NguoiTao like '%' + @ThanhLyVatTu_NguoiTao + '%')
end
go
-- Search VatTu Theo Xe
create or alter proc VATTUTHEOXE_Group2Search
@Xe_MaLoaiXe int = null,
@Xe_BienSo nvarchar(50) = null,
@VatTu_Ma int = null

as
begin
	select  x.Ma, x.Xe_MaLoaiXe, LX.LoaiXe_Ten, x.Xe_Ten, x.Xe_Gia, x.Xe_BienSo
	from VatTuTheoXe VTTX JOIN Xe X
	on VTTX.VatTuTheoXe_MaXe = X.Ma JOIN LoaiXe LX ON X.Xe_MaLoaiXe = LX.Ma
	where
	(@Xe_MaLoaiXe is null or @Xe_MaLoaiXe = '' or @Xe_MaLoaiXe = X.Xe_MaLoaiXe) and
	(@Xe_BienSo is null or @Xe_BienSo = '' or X.Xe_BienSo like '%' + @Xe_BienSo + '%') and
	(VTTX.VatTuTheoXe_TrangThai = 'N') and (VTTX.VatTuTheoXe_MaVatTu = @VatTu_Ma)
end
Go
-- Search VatTu Theo Xe in Use
create or alter proc VATTUTHEOXE_Group2SearchInUse
@Xe_MaLoaiXe int = null,
@Xe_BienSo nvarchar(50) = null,
@VatTu_Ma int = null

as
begin
	select  x.Ma, x.Xe_MaLoaiXe, LX.LoaiXe_Ten, x.Xe_Ten, x.Xe_Gia, x.Xe_BienSo
	from Xe x JOIN LoaiXe LX
	on x.Xe_MaLoaiXe = LX.Ma
	WHERE x.Ma NOT IN (
        SELECT VTTX.VatTuTheoXe_MaXe
        FROM VatTuTheoXe VTTX
        WHERE VTTX.VatTuTheoXe_TrangThai = 'N'
        AND (VTTX.VatTuTheoXe_MaVatTu = @VatTu_Ma)
    )
    AND 
    (@Xe_MaLoaiXe is null or @Xe_MaLoaiXe = '' or @Xe_MaLoaiXe = X.Xe_MaLoaiXe) and
	(@Xe_BienSo is null or @Xe_BienSo = '' or X.Xe_BienSo like '%' + @Xe_BienSo + '%')  
end
Go
--Them VatTu Theo Xe
create or ALTER Proc VATTUTHEOXE_Group2Insert
@VatTuTheoXe_MaVatTu int = null,
@VatTuTheoXe_MaXe int = null
as
begin transaction
begin try
	insert into VatTuTheoXe
		(VatTuTheoXe_MaVatTu,
		VatTuTheoXe_MaXe,
		VatTuTheoXe_TrangThai)
	values
		(@VatTuTheoXe_MaVatTu,
		@VatTuTheoXe_MaXe,
		'N')
	declare @ma int = scope_identity()
commit transaction
	select '0' as Result, N'Thêm thông tin vật tư theo xe thành công' as ErrorDesc, @ma as Ma
end try
begin catch
rollback transaction
end catch
go
--Sua VatTu Theo Xe
create or ALTER Proc VATTUTHEOXE_Group2Update
@VatTuTheoXe_Ma int = null,
@VatTuTheoXe_MaVatTu int = null,
@VatTuTheoXe_MaXe int = null
as
begin transaction
begin try
	update VatTuTheoXe
	set VatTuTheoXe_MaVatTu = @VatTuTheoXe_MaVatTu,
		VatTuTheoXe_MaXe = @VatTuTheoXe_MaXe
	where Ma = @VatTuTheoXe_Ma
commit transaction
	select '0' as Result, N'Cập nhật thông tin vật tư theo xe thành công' as ErrorDesc, @VatTuTheoXe_Ma as Ma
end try
begin catch
rollback transaction
end catch
go
--Del VatTu Theo Xe
CREATE or alter Proc VATTUTHEOXE_Group2Del
@Xe_Ma int = null,
@VatTu_Ma int = null
as
begin transaction
begin try
	update VatTuTheoXe
	set VatTuTheoXe_TrangThai = 'X'
	where (VatTuTheoXe_MaXe = @Xe_Ma) and (VatTuTheoXe_MaVatTu = @VatTu_Ma)
commit transaction
	select '0' as Result, N'Cập nhật thông tin thành công' as ErrorDesc
end try
begin catch
rollback transaction
end catch
go

