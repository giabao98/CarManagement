Use [DbPratice]
GO
--Search xe theo ID
CREATE or alter PROC [dbo].[THANHLY_Group2Search]
@ThanhLy_MaXe int=NULL
as
begin
	SELECT X.Ma, X.Xe_Ten, X.Xe_BienSo, L.LoaiXe_Hang, L.LoaiXe_NamSX, X.Xe_Mau, X.Xe_Gia, L.LoaiXe_DinhMucNhienLieu, X.Xe_TrangThai
	FROM [dbo].[Xe] X INNER JOIN [dbo].[LoaiXe] L
	ON X.Xe_MaLoaiXe = L.Ma
	WHERE
	(@ThanhLy_MaXe is NULL or X.Ma = @ThanhLy_MaXe) AND (X.Xe_TrangThai != 'T')
end
GO
--Insert vao thanh ly

CREATE or alter Proc [dbo].[THANHLY_Group2ThanhLy]
@ThanhLy_MaXe int=NULL,
@ThanhLy_LyDo varchar(50)=NULL,
@ThanhLy_NguoiMua varchar(50)=NULL,
@ThanhLy_SoTien bigint=NULL,
@ThanhLy_NguoiTao varchar(50)=NULL,
@ThanhLy_NgayTao datetime=NULL
as

if(exists(select * from ThanhLy where ThanhLy_MaXe = @ThanhLy_MaXe))
begin
	select N'Dữ liệu thanh lý đã tồn tại trong hệ thống' as ErrorDesc, '1' as Result
	RETURN
end

begin transaction
begin try
	INSERT INTO [dbo].[ThanhLy]
           ([ThanhLy_MaXe]
			,[ThanhLy_LyDo]
			,[ThanhLy_NguoiMua]
			,[ThanhLy_SoTien]
			,[ThanhLy_NguoiTao]
			,[ThanhLy_NgayTao])
	VALUES 
		(@ThanhLy_MaXe, @ThanhLy_LyDo, @ThanhLy_NguoiMua, @ThanhLy_SoTien, @ThanhLy_NguoiTao, @ThanhLy_NgayTao)

	update [dbo].[Xe] 
	set Xe_TrangThai = 'T'
	from [dbo].[Xe] X inner join [dbo].[ThanhLy] T
	On (X.Ma = T.ThanhLy_MaXe)
	Where T.ThanhLy_MaXe = @ThanhLy_MaXe
commit transaction
	select N'Đã Thanh lý' as ErrorDesc, 'O' as Result
end try
begin catch
	rollback transaction
end catch
Go
-- Search xe cho thanhly
Create or alter proc THANHLY_Group2SearchXe
@ThanhLy_MaXe int=NULL,
@Xe_Ten nvarchar(50) = null,
@Xe_BienSo varchar(50) = null,
@LoaiXe_Hang nvarchar(50) = null,
@LoaiXe_NamSX int = null,
@Xe_Mau nvarchar(50) = null,
@Xe_Gia bigint = null,
@LoaiXe_DinhMucNhienLieu varchar(1)
as
begin
	SELECT X.Ma, X.Xe_Ten, X.Xe_BienSo, L.LoaiXe_Hang, L.LoaiXe_NamSX, X.Xe_Mau, X.Xe_Gia, L.LoaiXe_DinhMucNhienLieu, X.Xe_TrangThai
	FROM [dbo].[Xe] X INNER JOIN [dbo].[LoaiXe] L
	ON X.Xe_MaLoaiXe = L.Ma
	WHERE
	(@ThanhLy_MaXe is NULL or X.Ma = @ThanhLy_MaXe) AND
	(@Xe_Ten is null or @Xe_Ten = '' or X.Xe_Ten like '%' + @Xe_Ten + '%') AND
	(@Xe_BienSo is null or @Xe_BienSo = '' or X.Xe_BienSo like '%' + @Xe_BienSo + '%') AND
	(@LoaiXe_Hang is null or @LoaiXe_Hang = '' or L.LoaiXe_Hang like '%' + @LoaiXe_Hang + '%') AND
	(@LoaiXe_NamSX is null or L.LoaiXe_NamSX = @LoaiXe_NamSX) AND
	(@Xe_Mau is null or @Xe_Mau = '' or X.Xe_Mau like '%' + @Xe_Mau + '%') AND
	(@Xe_Gia is null or X.Xe_Gia = @Xe_Gia) AND
	(@LoaiXe_DinhMucNhienLieu is null or L.LoaiXe_DinhMucNhienLieu = @LoaiXe_DinhMucNhienLieu) AND
	(X.Xe_TrangThai != 'T')
end
