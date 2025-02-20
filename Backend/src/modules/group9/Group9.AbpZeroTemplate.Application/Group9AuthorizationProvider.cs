﻿using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using GSoft.AbpZeroTemplate;

namespace Group9.AbpZeroTemplate.Application
{
  public class Group9AuthorizationProvider : AuthorizationProvider
  {
    private readonly bool _isMultiTenancyEnabled;

    public Group9AuthorizationProvider(bool isMultiTenancyEnabled)
    {
      _isMultiTenancyEnabled = isMultiTenancyEnabled;
    }

    public Group9AuthorizationProvider(IMultiTenancyConfig multiTenancyConfig)
    {
      _isMultiTenancyEnabled = multiTenancyConfig.IsEnabled;
    }

    public override void SetPermissions(IPermissionDefinitionContext context)
    {
            ////COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

            var pages = context.GetPermissionOrNull("Pages") ?? context.CreatePermission("Pages", L("Pages"));

            var Group9 = pages.CreateChildPermission("Pages.Group9", L("Group9"));

            var group9LoaiXe = pages.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9LoaiXe, L("Group9LoaiXe"));
            group9LoaiXe.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9LoaiXe_Add, L("Add"));

            var group9BaoTri = pages.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9BaoTri, L("BaoTri"));
            group9BaoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9BaoTri_Add, L("Create"));
            group9BaoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9BaoTri_Update, L("Edit"));
            group9BaoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9BaoTri_View, L("View"));
            group9BaoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Group9BaoTri_Delete, L("Delete"));

        }

    private static ILocalizableString L(string name)
    {
      return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
    }
  }
}
