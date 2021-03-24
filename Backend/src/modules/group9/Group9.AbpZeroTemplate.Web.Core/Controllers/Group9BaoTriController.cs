using Abp.AspNetCore.Mvc.Controllers;
using Abp.Dependency;
using Group9.AbpZeroTemplate.Application.Share.Group9.Dto;
using Group9.AbpZeroTemplate.Web.Core.Cars;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group9.AbpZeroTemplate.Application.Controllers
{
    [Route("api/[controller]/[action]")]
    public class Group9BaoTriController : AbpController
    {
        private readonly IGroup9BaoTriAppService Group9BaoTriAppService;

        public Group9BaoTriController(IGroup9BaoTriAppService Group9BaoTriAppService)
        {
            this.Group9BaoTriAppService = Group9BaoTriAppService;
        }
   
   
        [HttpPost]
        public IDictionary<string, object> BAOTRI_Group9Insert([FromBody]Group9BaoTriDto input)
        {
            return Group9BaoTriAppService.BAOTRI_Group9Insert(input);
        }
        [HttpPost]
        public IDictionary<string, object> BAOTRI_Group9Delete(int id)
        {
            return Group9BaoTriAppService.BAOTRI_Group9Delete(id);
        }
        [HttpPost]
        public IDictionary<string, object> Group9BaoTri_Update([FromBody]Group9BaoTriDto input)
        {
            return Group9BaoTriAppService.BAOTRI_Group9Update(input);
        }
        [HttpPost]
        public List<Group9BaoTriDto> Group9BaoTri_Search([FromBody]Group9BaoTriDto input)
        {
            return Group9BaoTriAppService.BAOTRI_Group9Search(input);
        }
        [HttpPost]
        public Group9BaoTriDto Group9BaoTri_ById(int id)
        {
            return Group9BaoTriAppService.BAOTRI_Group9ById(id);
        }
        [HttpPost]

        public List<Group9BaoTriDto> Group9BaoTri_SearchAll()
        {
            return Group9BaoTriAppService.BAOTRI_Group9SearchAll();
        }

    }
}
