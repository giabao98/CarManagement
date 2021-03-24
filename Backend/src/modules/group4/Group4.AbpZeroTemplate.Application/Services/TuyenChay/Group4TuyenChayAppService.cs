using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using GSoft.AbpZeroTemplate.Helpers;
using GSoft.AbpZeroTemplate.Sessions;
using Group4.AbpZeroTemplate.Application.Share.Group4.Dto;
using Microsoft.AspNetCore.Builder;
using Abp.Application.Services;
using Abp.Runtime.Session;
using System.Threading.Tasks;
using GSoft.AbpZeroTemplate.Sessions;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Group4.AbpZeroTemplate.Web.Core.Services.TuyenChay.Dto;

namespace Group4.AbpZeroTemplate.Web.Core.Services.TuyenChay
{
    public interface IGroup4TuyenChayAppService : IApplicationService
    {
         IDictionary<string,object> TUYENCHAY_Group4Insert(Group4TuyenChayDto input);
         List<Group4TuyenChayDto> TUYENCHAY_Group4Search(Group4TuyenChayDto input);
         Group4TuyenChayDto TUYENCHAY_Group4SearchById(int ma);
         IDictionary<string, object> TUYENCHAY_Group4Update(Group4TuyenChayDto input);
         IDictionary<string, object> TUYENCHAY_Group4Approve(int ma, string nguoiDuyet);
         IDictionary<string, object> TUYENCHAY_Group4Reject(int ma, string nguoiDuyet, string liDoTuChoi);
         IDictionary<string, object> TUYENCHAY_Group4Delete(int ma);

    }
    public class Group4TuyenChayAppService : BaseService, IGroup4TuyenChayAppService
    {
        public IDictionary<string, object> TUYENCHAY_Group4Insert(Group4TuyenChayDto input)
        {
            return procedureHelper.GetData<dynamic>("TUYENCHAY_Group4Insert", input).FirstOrDefault();
        }

        public List<Group4TuyenChayDto> TUYENCHAY_Group4Search(Group4TuyenChayDto input)
        {
            return procedureHelper.GetData<Group4TuyenChayDto>("TUYENCHAY_Group4Search", input);
        }

        public Group4TuyenChayDto TUYENCHAY_Group4SearchById(int ma)
        {
            return procedureHelper.GetData<Group4TuyenChayDto>("TUYENCHAY_Group4SearchById", new
            {
                Ma = ma
            }).FirstOrDefault();
        }
        public IDictionary<string, object> TUYENCHAY_Group4Update(Group4TuyenChayDto input)
        {
            return procedureHelper.GetData<dynamic>("TUYENCHAY_Group4Update", input).FirstOrDefault();
        }
        public IDictionary<string, object> TUYENCHAY_Group4Approve(int ma, string nguoiDuyet)
        {
            return procedureHelper.GetData<dynamic>("TUYENCHAY_Group4Approve", new
            {
                Ma = ma,
                TuyenChay_NguoiDuyet = nguoiDuyet
            }).FirstOrDefault();

        }
        public IDictionary<string, object> TUYENCHAY_Group4Reject(int ma, string nguoiDuyet, string liDoTuChoi)
        {
            return procedureHelper.GetData<dynamic>("TUYENCHAY_Group4Reject", new { 
                Ma = ma, 
                TuyenChay_NguoiDuyet = nguoiDuyet,
                TuyenChay_LiDoTuChoi = liDoTuChoi
            }).FirstOrDefault();

        }
        public IDictionary<string, object> TUYENCHAY_Group4Delete(int ma)
        {
            return procedureHelper.GetData<dynamic>("TUYENCHAY_Group4Delete", new
            {
                Ma = ma
            }).FirstOrDefault();
        }
    }
}
