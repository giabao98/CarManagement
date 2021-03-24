using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using GSoft.AbpZeroTemplate.Helpers;
using GSoft.AbpZeroTemplate.Sessions;
using Group2.AbpZeroTemplate.Application.Share.Group2.Dto;
using Microsoft.AspNetCore.Builder;
using Abp.Application.Services;
using Abp.Runtime.Session;
using System.Threading.Tasks;
using GSoft.AbpZeroTemplate.Sessions;
using GSoft.AbpZeroTemplate.Sessions.Dto;

namespace Group2.AbpZeroTemplate.Web.Core.Cars
{
    public interface IGroup2VatTuAppService : IApplicationService
    {
        List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2Search(Group2VatTuTheoXeSearchInput input);
        List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2SearchInUse(Group2VatTuTheoXeSearchInput input);
        IDictionary<string, object> VATTUTHEOXE_Group2Insert(Group2VatTuTheoXeInsert input);
        IDictionary<string, object> VATTUTHEOXE_Group2Update(Group2VatTuTheoXeUpdate input);
        IDictionary<string, object> VATTUTHEOXE_Group2Del(Group2VatTuTheoXeDelete input);
        IDictionary<string, object> VATTU_Group2Insert(Group2VatTuInsertInput input);
        IDictionary<string, object> VATTU_Group2Update(Group2VatTuUpdateInput input);
        List<Group2VatTuSearch> VATTU_Group2Search(Group2VatTuSearchInput input);
        List<Group2VatTuSearch> VATTU_Group2SearchById(int Ma);
        IDictionary<string, object> VATTU_Group2ThanhLy(Group2VatTuThanhLyInput input);
        List<Group2VatTuSearchThanhLy> VATTU_Group2ThanhLySearch(Group2VatTuSearchThanhLyInput input);

    }
    public class Group2VatTuAppService : BaseService, IGroup2VatTuAppService
    {
        public Group2VatTuAppService()
        {

        }
        public List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2Search(Group2VatTuTheoXeSearchInput input)
        {
            return procedureHelper.GetData<Group2VatTuTheoXeSearch>("VATTUTHEOXE_Group2Search", input);
        }
        public List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2SearchInUse(Group2VatTuTheoXeSearchInput input)
        {
            return procedureHelper.GetData<Group2VatTuTheoXeSearch>("VATTUTHEOXE_Group2SearchInUse", input);
        }
        public IDictionary<string, object> VATTUTHEOXE_Group2Insert(Group2VatTuTheoXeInsert input)
        {
            return procedureHelper.GetData<dynamic>("VATTUTHEOXE_Group2Insert", input).FirstOrDefault();
        }
        public IDictionary<string, object> VATTUTHEOXE_Group2Update(Group2VatTuTheoXeUpdate input)
        {
            return procedureHelper.GetData<dynamic>("VATTUTHEOXE_Group2Update", input).FirstOrDefault();
        }
        public IDictionary<string, object> VATTUTHEOXE_Group2Del(Group2VatTuTheoXeDelete input)
        {
            return procedureHelper.GetData<dynamic>("VATTUTHEOXE_Group2Del", input).FirstOrDefault();
        }
        public IDictionary<string, object> VATTU_Group2Insert(Group2VatTuInsertInput input)
        {
            return procedureHelper.GetData<dynamic>("VATTU_Group2Insert", input).FirstOrDefault();
        }
        public IDictionary<string, object> VATTU_Group2Update(Group2VatTuUpdateInput input)
        {
            return procedureHelper.GetData<dynamic>("VATTU_Group2Update", input).FirstOrDefault();
        }
        public List<Group2VatTuSearch> VATTU_Group2Search(Group2VatTuSearchInput input)
        {
            return procedureHelper.GetData<Group2VatTuSearch>("VATTU_Group2Search", input);
        }
        public List<Group2VatTuSearch> VATTU_Group2SearchById(int Ma)
        {
            return procedureHelper.GetData<Group2VatTuSearch>("VATTU_Group2SearchById", new
            {
                VatTu_Ma = Ma
            });
        }
        public IDictionary<string, object> VATTU_Group2ThanhLy(Group2VatTuThanhLyInput input)
        {
            return procedureHelper.GetData<dynamic>("VATTU_Group2ThanhLy", input).FirstOrDefault();
        }
        public List<Group2VatTuSearchThanhLy> VATTU_Group2ThanhLySearch(Group2VatTuSearchThanhLyInput input)
        {
            return procedureHelper.GetData<Group2VatTuSearchThanhLy>("VATTU_Group2ThanhLySearch", input);
        }
    }
}
