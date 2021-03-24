using Abp.AspNetCore.Mvc.Controllers;
using Abp.Dependency;
using Group2.AbpZeroTemplate.Application.Share.Group2.Dto;
using Group2.AbpZeroTemplate.Web.Core.Cars;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Group2.AbpZeroTemplate.Application.Controllers
{
    [Route("api/[controller]/[action]")]
    public class Group2VatTuController : AbpController
    {
        private readonly IGroup2VatTuAppService Group2VatTuAppService;

        public Group2VatTuController(IGroup2VatTuAppService Group2VatTuAppService)
        {
            this.Group2VatTuAppService = Group2VatTuAppService;
        }
        [HttpPost]
        public List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2Search([FromBody]Group2VatTuTheoXeSearchInput input)
        {
            return Group2VatTuAppService.VATTUTHEOXE_Group2Search(input);
        }
        [HttpPost]
        public List<Group2VatTuTheoXeSearch> VATTUTHEOXE_Group2SearchInUse([FromBody] Group2VatTuTheoXeSearchInput input)
        {
            return Group2VatTuAppService.VATTUTHEOXE_Group2SearchInUse(input);
        }
        [HttpPost]
        public IDictionary<string, object> VATTUTHEOXE_Group2Insert([FromBody] Group2VatTuTheoXeInsert input)
        {
            return Group2VatTuAppService.VATTUTHEOXE_Group2Insert(input);
        }
        [HttpPost]
        public IDictionary<string, object> VATTUTHEOXE_Group2Update([FromBody] Group2VatTuTheoXeUpdate input)
        {
            return Group2VatTuAppService.VATTUTHEOXE_Group2Update(input);
        }
        [HttpPost]
        public IDictionary<string, object> VATTUTHEOXE_Group2Del([FromBody] Group2VatTuTheoXeDelete input)
        {
            return Group2VatTuAppService.VATTUTHEOXE_Group2Del(input);
        }
        [HttpPost]
        public IDictionary<string, object> VATTU_Group2Insert([FromBody] Group2VatTuInsertInput input)
        {
            return Group2VatTuAppService.VATTU_Group2Insert(input);
        }
        [HttpPost]
        public IDictionary<string, object> VATTU_Group2Update([FromBody] Group2VatTuUpdateInput input)
        {
            return Group2VatTuAppService.VATTU_Group2Update(input);
        }
        [HttpPost]
        public List<Group2VatTuSearch> VATTU_Group2Search([FromBody] Group2VatTuSearchInput input)
        {
            return Group2VatTuAppService.VATTU_Group2Search(input);
        }
        [HttpPost]
        public List<Group2VatTuSearch> VATTU_Group2SearchById(int Ma)
        {
            return Group2VatTuAppService.VATTU_Group2SearchById(Ma);
        }
        [HttpPost]
        public IDictionary<string, object> VATTU_Group2ThanhLy([FromBody] Group2VatTuThanhLyInput input)
        {
            return Group2VatTuAppService.VATTU_Group2ThanhLy(input);
        }
        [HttpPost]
        public List<Group2VatTuSearchThanhLy> VATTU_Group2ThanhLySearch([FromBody] Group2VatTuSearchThanhLyInput input)
        {
            return Group2VatTuAppService.VATTU_Group2ThanhLySearch(input);
        }
    }
}
