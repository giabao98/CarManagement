USE DbPratice

GO

ALTER TABLE TuyenChay
DROP COLUMN TuyenChay_SoKm
GO

ALTER TABLE TuyenChay
ADD TuyenChay_SoKm float NULL
GO

ALTER TABLE LichTrinh
DROP COLUMN LichTrinh_MaTaiXe

GO
ALTER TABLE TuyenChay
DROP COLUMN TuyenChay_Ten

GO
ALTER TABLE TuyenChay ADD TuyenChay_TrangThaiDuyet varchar(1) NULL

GO
ALTER TABLE TuyenChay ADD TuyenChay_NgayDuyet DateTime NULL

GO
ALTER TABLE TuyenChay ADD TuyenChay_NguoiDuyet nvarchar(50) NULL

GO
ALTER TABLE TuyenChay ADD TuyenChay_MucDich nvarchar(max) NULL

GO
ALTER TABLE TuyenChay ADD TuyenChay_LiDoTuChoi nvarchar(max) NULL

GO
ALTER PROC [dbo].[TUYENCHAY_Group4Insert] 
@TuyenChay_DiemDen nvarchar(max) = NULL
,@TuyenChay_DiemDi nvarchar(max) = NULL
,@TuyenChay_SoKm float = NULL
,@TuyenChay_NguoiTao nvarchar(50) = NULL,
@TuyenChay_MucDich nvarchar(max) = NULL
AS
if(exists(select TuyenChay_DiemDen, TuyenChay_DiemDi from TuyenChay where TuyenChay_DiemDen = @TuyenChay_DiemDen 
and TuyenChay_DiemDi = @TuyenChay_DiemDi and TuyenChay_TrangThai = 'N'))
begin
	select '1' as Result, N'Đã có tuyến chạy này trong hệ thống' as ErrorDesc
	RETURN
end

if(@TuyenChay_DiemDi = @TuyenChay_DiemDen)
begin
	select '1' as Result, N'Điểm đi không được trùng với điểm đến' as ErrorDesc
	return
end

if(ISNUMERIC(@TuyenChay_SoKm) = 0)
begin
	select '1' as Result, N'Số km phải là số' as ErrorDesc
	return
end

if(convert(float,@TuyenChay_SoKm) <= 0)
begin
	select '1' as Result, N'Khoảng cách không được bé hơn hoặc bằng 0' as ErrorDesc
	return
end

begin transaction
begin try
	INSERT INTO [dbo].[TuyenChay]
           ([TuyenChay_DiemDen]
           ,[TuyenChay_DiemDi]
           ,[TuyenChay_SoKm]
           ,[TuyenChay_NgayTao]
           ,[TuyenChay_NguoiTao]
           ,[TuyenChay_TrangThai]
           ,[TuyenChay_TrangThaiDuyet]
           ,[TuyenChay_MucDich])
     VALUES
	 (
		@TuyenChay_DiemDen,
		@TuyenChay_DiemDi,
		@TuyenChay_SoKm,
		GETDATE(),
		@TuyenChay_NguoiTao,
		'N',
		'C',
		@TuyenChay_MucDich
	 )
	declare @Ma int = SCOPE_IDENTITY()
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

GO
ALTER proc [dbo].[TUYENCHAY_Group4Search]
@Ma int = NULL,
@TuyenChay_DiemDen nvarchar(max) = NULL,
@TuyenChay_DiemDi nvarchar(max) = NULL,
@TuyenChay_SoKmBatDau nvarchar(50) = NULL,
@TuyenChay_SoKmKetThuc nvarchar(50) = NULL,
@TuyenChay_TrangThaiDuyet varchar(1) = NULL,
@TuyenChay_MucDich nvarchar(max) = NULL,
@TuyenChay_LiDoTuChoi nvarchar(max) = NULL
as
begin
	if(@TuyenChay_SoKmBatDau is NULL or @TuyenChay_SoKmKetThuc is NULL)
	begin
		select * from TuyenChay where
		(@TuyenChay_DiemDen is NULL or @TuyenChay_DiemDen = '' or TuyenChay_DiemDen Like '%' + @TuyenChay_DiemDen + '%')
		and (@TuyenChay_DiemDi is NULL or @TuyenChay_DiemDi = '' or TuyenChay_DiemDi Like '%' + @TuyenChay_DiemDi + '%')
		and (@TuyenChay_MucDich is NULL or @TuyenChay_MucDich = '' or TuyenChay_MucDich Like '%' + @TuyenChay_MucDich + '%')
		and (@TuyenChay_LiDoTuChoi is NULL or @TuyenChay_LiDoTuChoi = '' or TuyenChay_LiDoTuChoi Like '%' + @TuyenChay_LiDoTuChoi + '%')
		and (@TuyenChay_TrangThaiDuyet is NULL or TuyenChay_TrangThaiDuyet = @TuyenChay_TrangThaiDuyet)
		and (@Ma is NULL or Ma = @Ma)
		and TuyenChay_TrangThai != 'X'
	end
	else
	begin
		select * from TuyenChay where
		(@TuyenChay_DiemDen is NULL or @TuyenChay_DiemDen = '' or TuyenChay_DiemDen Like '%' + @TuyenChay_DiemDen + '%')
		and (@TuyenChay_DiemDi is NULL or @TuyenChay_DiemDi = '' or TuyenChay_DiemDi Like '%' + @TuyenChay_DiemDi + '%')
		and (@TuyenChay_MucDich is NULL or @TuyenChay_MucDich = '' or TuyenChay_MucDich Like '%' + @TuyenChay_MucDich + '%')
		and (@TuyenChay_LiDoTuChoi is NULL or @TuyenChay_LiDoTuChoi = '' or TuyenChay_LiDoTuChoi Like '%' + @TuyenChay_LiDoTuChoi + '%')
		and (@TuyenChay_TrangThaiDuyet is NULL or TuyenChay_TrangThaiDuyet = @TuyenChay_TrangThaiDuyet)
		and (@Ma is NULL or Ma = @Ma)
		and (TuyenChay_SoKm >= @TuyenChay_SoKmBatDau)
		and (TuyenChay_SoKm <= @TuyenChay_SoKmKetThuc)
		and TuyenChay_TrangThai != 'X'
	end
end

GO

ALTER PROC TUYENCHAY_Group4Update
@Ma int = NULL,
@TuyenChay_DiemDen nvarchar(max) = NULL,
@TuyenChay_DiemDi nvarchar(max) = NULL,
@TuyenChay_SoKm float = NULL,
@TuyenChay_MucDich nvarchar(max) = NULL,
@TuyenChay_NguoiTao nvarchar(50) = NULL
as

if(exists(SELECT * FROM TuyenChay WHERE Ma =  @Ma and (TuyenChay_TrangThaiDuyet = 'D' or TuyenChay_TrangThaiDuyet = 'T') and TuyenChay_TrangThai = 'N'))
begin
	select '1' as Result, N'Chỉ được cập nhật tuyến chạy có trạng thái chưa duyệt' as ErrorDesc
	return
end

if(exists(SELECT * FROM TuyenChay WHERE TuyenChay_DiemDen = @TuyenChay_DiemDen and TuyenChay_DiemDi = @TuyenChay_DiemDi
	and Ma !=  @Ma and TuyenChay_TrangThai = 'N'))
begin
	select '1' as Result, N'Đã có tuyến chạy này trong hệ thống, không được cập nhật trùng' as ErrorDesc
	return
end

if(@TuyenChay_DiemDi = @TuyenChay_DiemDen)
begin
	select '1' as Result, N'Điểm đi không được trùng với điểm đến' as ErrorDesc
	return
end

if(@TuyenChay_SoKm <= 0)
begin
	select '1' as Result, N'Khoảng cách không được bé hơn hoặc bằng 0' as ErrorDesc
	return
end

begin transaction
begin try
	UPDATE TuyenChay
	SET
	TuyenChay_DiemDen = @TuyenChay_DiemDen,
	TuyenChay_DiemDi = @TuyenChay_DiemDi,
	TuyenChay_SoKm = @TuyenChay_SoKm,
	TuyenChay_MucDich = @TuyenChay_MucDich,
	TuyenChay_NguoiTao = @TuyenChay_NguoiTao,
	TuyenChay_NgayTao = GETDATE()
	WHERE
	Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

GO

CREATE PROC TUYENCHAY_Group4Delete
@Ma int = NULL
as
begin transaction
begin try
	update TuyenChay set TuyenChay_TrangThai = 'X' where Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

GO

CREATE PROC TUYENCHAY_Group4SearchById
@Ma int = NULL
as
SELECT * FROM TuyenChay WHERE Ma = @Ma

GO

CREATE PROC TUYENCHAY_Group4Approve
@Ma int = NULL,
@TuyenChay_NguoiDuyet nvarchar(50) = NULL
as
if(exists(SELECT * FROM TuyenChay WHERE Ma = @Ma and TuyenChay_NguoiTao = @TuyenChay_NguoiDuyet))
begin
	select '1' as Result, N'Người duyệt không được trùng với người tạo' as ErrorDesc
	return
end

if(exists(SELECT * FROM TuyenChay WHERE Ma = @Ma and TuyenChay_TrangThai = 'X'))
begin
	select '1' as Result, N'Không được duyệt tuyến chạy đã xóa' as ErrorDesc
	return
end
begin transaction
begin try
	UPDATE TuyenChay
	SET
	TuyenChay_TrangThaiDuyet = 'D',
	TuyenChay_NguoiDuyet = @TuyenChay_NguoiDuyet,
	TuyenChay_NgayDuyet = GETDATE()
	WHERE
	Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

GO

CREATE PROC TUYENCHAY_Group4Reject
@Ma int = NULL,
@TuyenChay_NguoiDuyet nvarchar(50) = NULL,
@TuyenChay_LiDoTuChoi nvarchar(max) = NULL
as

if(exists(SELECT * FROM TuyenChay WHERE Ma = @Ma and TuyenChay_TrangThaiDuyet = 'D'))
begin
	select '1' as Result, N'Không được từ chối tuyến chạy có trạng thái đã duyệt' as ErrorDesc
	return
end

if(exists(SELECT * FROM TuyenChay WHERE Ma = @Ma and TuyenChay_NguoiTao = @TuyenChay_NguoiDuyet))
begin
	select '1' as Result, N'Người duyệt không được trùng với người tạo' as ErrorDesc
	return
end

if(exists(SELECT * FROM TuyenChay WHERE Ma = @Ma and TuyenChay_TrangThai = 'X'))
begin
	select '1' as Result, N'Không được duyệt tuyến chạy đã xóa' as ErrorDesc
	return
end
begin transaction
begin try
	UPDATE TuyenChay
	SET
	TuyenChay_TrangThaiDuyet = 'T',
	TuyenChay_NguoiDuyet = @TuyenChay_NguoiDuyet,
	TuyenChay_NgayDuyet = GETDATE(),
	TuyenChay_LiDoTuChoi = @TuyenChay_LiDoTuChoi
	WHERE
	Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

GO

ALTER proc [dbo].[LICHTRINH_Group4Search]
@Ma int = NULL,
@LichTrinh_MaTuyenChay int = NULL,
@LichTrinh_MaXe int = NULL,
@LichTrinh_TrangThaiChuyen varchar(1) = NULL,
@LichTrinh_NgayDi datetime = NULL,
@LichTrinh_NgayDen datetime = NULL
as
begin

if(@LichTrinh_NgayDen is not NULL and @LichTrinh_NgayDi is not NULL)
begin
	SELECT LichTrinh.Ma , LichTrinh_NgayDi, LichTrinh_NgayDen, LichTrinh_TrangThaiChuyen, LichTrinh_TrangThai, LichTrinh_MaTuyenChay
	LichTrinh_MaXe, Xe_BienSo, TuyenChay.TuyenChay_DiemDi, TuyenChay.TuyenChay_DiemDen, TuyenChay.TuyenChay_SoKm
	FROM [dbo].[LichTrinh], Xe, TuyenChay
	WHERE
	(LichTrinh_NgayDi >= @LichTrinh_NgayDi)
	and (LichTrinh_NgayDen <= @LichTrinh_NgayDen)
	and (@LichTrinh_MaXe is NULL or LichTrinh_MaXe = @LichTrinh_MaXe)
	and (@LichTrinh_MaTuyenChay is NULL or LichTrinh_MaTuyenChay = @LichTrinh_MaTuyenChay)
	and (@LichTrinh_TrangThaiChuyen is NULL or @LichTrinh_TrangThaiChuyen = '' or LichTrinh_TrangThaiChuyen = @LichTrinh_TrangThaiChuyen)
	and (LichTrinh_TrangThai = 'N')
	and (Xe.Ma = LichTrinh_MaXe)
	and (TuyenChay.Ma = LichTrinh_MaTuyenChay)
	and (@Ma is NULL or LichTrinh.Ma = @Ma)
end

else if (@LichTrinh_NgayDen is not NULL and @LichTrinh_NgayDi is NULL)
begin
	SELECT LichTrinh.Ma , LichTrinh_NgayDi, LichTrinh_NgayDen, LichTrinh_TrangThaiChuyen, LichTrinh_TrangThai,
	LichTrinh_MaXe, Xe.Xe_BienSo, TuyenChay.TuyenChay_DiemDi, TuyenChay.TuyenChay_DiemDen, TuyenChay.TuyenChay_SoKm, LichTrinh_MaTuyenChay
	FROM [dbo].[LichTrinh], Xe, TuyenChay
	WHERE (LichTrinh_NgayDen <= @LichTrinh_NgayDen)
	and (@LichTrinh_MaXe is NULL or LichTrinh_MaXe = @LichTrinh_MaXe)
	and (@LichTrinh_MaTuyenChay is NULL or LichTrinh_MaTuyenChay = @LichTrinh_MaTuyenChay)
	and (@LichTrinh_TrangThaiChuyen is NULL or @LichTrinh_TrangThaiChuyen = '' or LichTrinh_TrangThaiChuyen = @LichTrinh_TrangThaiChuyen)
	and (LichTrinh_TrangThai = 'N')
	and (Xe.Ma = LichTrinh_MaXe)
	and (TuyenChay.Ma = LichTrinh_MaTuyenChay)
	and (@Ma is NULL or LichTrinh.Ma = @Ma)
end

else if(@LichTrinh_NgayDen is  NULL and @LichTrinh_NgayDi is not NULL)
begin
	SELECT LichTrinh.Ma , LichTrinh_NgayDi, LichTrinh_NgayDen, LichTrinh_TrangThaiChuyen, LichTrinh_TrangThai,
	LichTrinh_MaXe, Xe.Xe_BienSo, TuyenChay.TuyenChay_DiemDi, TuyenChay.TuyenChay_DiemDen, TuyenChay.TuyenChay_SoKm, LichTrinh_MaTuyenChay
	FROM [dbo].[LichTrinh], Xe, TuyenChay
	WHERE (LichTrinh_NgayDi >=  @LichTrinh_NgayDi)
	and (@LichTrinh_MaTuyenChay is NULL or LichTrinh_MaTuyenChay = @LichTrinh_MaTuyenChay)
	and (@LichTrinh_TrangThaiChuyen is NULL or @LichTrinh_TrangThaiChuyen = '' or LichTrinh_TrangThaiChuyen = @LichTrinh_TrangThaiChuyen)
	and (@LichTrinh_MaXe is NULL or LichTrinh_MaXe = @LichTrinh_MaXe)
	and (LichTrinh_TrangThai = 'N')
	and (Xe.Ma = LichTrinh_MaXe)
	and (TuyenChay.Ma = LichTrinh_MaTuyenChay)
	and (@Ma is NULL or LichTrinh.Ma = @Ma)
end

else
begin
	SELECT LichTrinh.Ma , LichTrinh_NgayDi, LichTrinh_NgayDen, LichTrinh_TrangThaiChuyen, LichTrinh_TrangThai,
	LichTrinh_MaXe, Xe.Xe_BienSo, TuyenChay.TuyenChay_DiemDi, TuyenChay.TuyenChay_DiemDen, TuyenChay.TuyenChay_SoKm, LichTrinh_MaTuyenChay
	FROM [dbo].[LichTrinh], TuyenChay, Xe
	WHERE
	(@LichTrinh_NgayDi is NULL or LichTrinh_NgayDi = @LichTrinh_NgayDi)
	and (@LichTrinh_NgayDen is NULL or LichTrinh_NgayDen = @LichTrinh_NgayDen)
	and (@LichTrinh_MaTuyenChay is NULL or LichTrinh_MaTuyenChay = @LichTrinh_MaTuyenChay)
	and (@LichTrinh_MaXe is NULL or LichTrinh_MaXe = @LichTrinh_MaXe)
	and (@LichTrinh_TrangThaiChuyen is NULL or @LichTrinh_TrangThaiChuyen = '' or LichTrinh_TrangThaiChuyen = @LichTrinh_TrangThaiChuyen)
	and (LichTrinh_TrangThai = 'N')
	and (TuyenChay.Ma = LichTrinh_MaTuyenChay)
	and (Xe.Ma = LichTrinh_MaXe)
	and (@Ma is NULL or LichTrinh.Ma = @Ma)
end

end

GO

ALTER proc [dbo].[LICHTRINH_Group4Insert]
@LichTrinh_NgayDi datetime = NULL,
@LichTrinh_NgayDen datetime = NULL,
@LichTrinh_MaTuyenChay int = NULL,
@LichTrinh_MaXe int = NULL,
@LichTrinh_NguoiTao nvarchar(50) = NULL
as
if(GETDATE() >= CONVERT(datetime, @LichTrinh_NgayDi))
begin
	select '1' as Result, N'Thời gian đi phải lớn hơn thời gian hiện tại' as ErrorDesc
	return
end

if(CONVERT(datetime, @LichTrinh_NgayDen) <= CONVERT(datetime, @LichTrinh_NgayDi))
begin
	select '1' as Result, N'Thời gian đến không được bé hơn thời gian đi' as ErrorDesc
	return
end
if(not exists(select * from TuyenChay where Ma = @LichTrinh_MaTuyenChay 
and TuyenChay_TrangThai = 'N' and TuyenChay_TrangThaiDuyet = 'D'))
begin
	select '1' as Result, N'Tuyến chạy không tồn tại hoặc chưa được duyệt' as ErrorDesc
	return
end

if(not exists(select * from Xe where Ma = @LichTrinh_MaXe and Xe.Xe_TrangThai = 'N'))
begin
	select '1' as Result, N'Xe không có trong hệ thống' as ErrorDesc
	return
end

begin transaction
begin try
	
INSERT INTO [dbo].[LichTrinh]
           ([LichTrinh_NgayDi]
           ,[LichTrinh_NgayDen]
           ,[LichTrinh_MaTuyenChay]
           ,LichTrinh_MaXe
           ,[LichTrinh_TrangThaiChuyen]
           ,[LichTrinh_NgayTao]
           ,[LichTrinh_NguoiTao]
           ,[LichTrinh_TrangThai])
VALUES(
	@LichTrinh_NgayDi,
	@LichTrinh_NgayDen,
	@LichTrinh_MaTuyenChay,
	@LichTrinh_MaXe,
	'C',
	GETDATE(),
	@LichTrinh_NguoiTao,
	'N')
	declare @Ma int = SCOPE_IDENTITY()
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch


GO

ALTER proc [dbo].[LICHTRINH_Group4SearchById]
@Ma int = NULL
as
begin
	SELECT LichTrinh.Ma, LichTrinh_NgayDi, LichTrinh_NgayDen, LichTrinh_TrangThaiChuyen, LichTrinh_TrangThai,
	LichTrinh_MaXe, Xe.Xe_BienSo, TuyenChay.TuyenChay_DiemDi, TuyenChay.TuyenChay_DiemDen, TuyenChay.TuyenChay_SoKm, LichTrinh_MaTuyenChay
	FROM [dbo].[LichTrinh]
	LEFT JOIN Xe
	ON Xe.Ma = LichTrinh.LichTrinh_MaXe
	LEFT JOIN TuyenChay
	ON TuyenChay.Ma = LichTrinh.LichTrinh_MaTuyenChay
	WHERE LichTrinh.Ma = @Ma and LichTrinh.LichTrinh_TrangThai != 'X'
end

GO

ALTER proc [dbo].[LICHTRINH_Group4Update]
@Ma int = NULL,
@LichTrinh_NgayDi datetime = NULL,
@LichTrinh_NgayDen datetime = NULL,
@LichTrinh_MaTuyenChay int = NULL,
@LichTrinh_MaXe int = NULL,
@LichTrinh_NguoiTao nvarchar(50) = NULL,
@LichTrinh_TrangThaiChuyen varchar(1) = NULL
as

if( @LichTrinh_TrangThaiChuyen = 'C'and exists(select * from LichTrinh Where (LichTrinh_TrangThaiChuyen = 'D' or LichTrinh_TrangThaiChuyen = 'K') and Ma = @Ma))
begin
	select '1' as Result, N'Không thể cập nhật lịch trình đang chạy hoặc đã kết thúc về chưa nhận' as ErrorDesc
	return
end

if(GETDATE() >= CONVERT(datetime, @LichTrinh_NgayDi))
begin
	select '1' as Result, N'Thời gian đi phải lớn hơn thời gian hiện tại' as ErrorDesc
	return
end

if(CONVERT(datetime, @LichTrinh_NgayDen) <= CONVERT(datetime, @LichTrinh_NgayDi))
begin
	select '1' as Result, N'Thời gian đến không được bé hơn thời gian đi' as ErrorDesc
	return
end
if(not exists(select * from TuyenChay where Ma = @LichTrinh_MaTuyenChay and TuyenChay_TrangThai = 'N'))
begin
	select '1' as Result, N'Tuyến chạy không tồn tại' as ErrorDesc
	return
end

if(not exists(select * from Xe where Ma = @LichTrinh_MaXe and Xe_TrangThai = 'N'))
begin
	select '1' as Result, N'Xe không tồn tại trong hệ thống' as ErrorDesc
	return
end

if(exists(select * from LichTrinh where Ma = @Ma and LichTrinh_TrangThai = 'X'))
begin
	select '1' as Result, N'Không được cập nhật lịch trình đã xóa' as ErrorDesc
	return
end

begin transaction
begin try
	
UPDATE LichTrinh
         
SET
	LichTrinh_NgayDi = @LichTrinh_NgayDi,
	LichTrinh_NgayDen = @LichTrinh_NgayDen,
	LichTrinh_MaTuyenChay = @LichTrinh_MaTuyenChay,
	LichTrinh_MaXe = @LichTrinh_MaXe,
	LichTrinh_TrangThaiChuyen = @LichTrinh_TrangThaiChuyen,
	LichTrinh_NgayTao = GETDATE(),
	LichTrinh_NguoiTao = @LichTrinh_NguoiTao
WHERE
	Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
