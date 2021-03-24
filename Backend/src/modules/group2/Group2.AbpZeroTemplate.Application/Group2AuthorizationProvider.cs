using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using GSoft.AbpZeroTemplate;

namespace Group2.AbpZeroTemplate.Application
{
  public class Group2AuthorizationProvider : AuthorizationProvider
  {
    private readonly bool _isMultiTenancyEnabled;

    public Group2AuthorizationProvider(bool isMultiTenancyEnabled)
    {
      _isMultiTenancyEnabled = isMultiTenancyEnabled;
    }

    public Group2AuthorizationProvider(IMultiTenancyConfig multiTenancyConfig)
    {
      _isMultiTenancyEnabled = multiTenancyConfig.IsEnabled;
    }

    public override void SetPermissions(IPermissionDefinitionContext context)
    {
      //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

      var pages = context.GetPermissionOrNull("Pages") ?? context.CreatePermission("Pages", L("Pages"));
      var Group2 = pages.CreateChildPermission("Pages.Group2", L("Group2"));


      var group2ThanhLy = pages.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2ThanhLy, L("Group2ThanhLy"));
      group2ThanhLy.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2ThanhLy_Insert, L("Insert"));

      var group2TaiXe = pages.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe, L("Group2TaiXe"));
      group2TaiXe.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe_Insert, L("Insert"));
      group2TaiXe.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe_Search, L("Search"));
      group2TaiXe.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe_Delete, L("Delete"));
      group2TaiXe.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe_Update, L("Update"));
      group2TaiXe.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2TaiXe_QuickUpdate, L("Quick Update"));

      var group2VatTu = pages.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTu, L("Group2VatTu"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTu_Insert, L("Insert"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTu_Search, L("Search"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTu_Delete, L("Delete"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTu_Update, L("Update"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTuTheoXe_Insert, L("VatTuTheoXe_Insert"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTuTheoXe_Search, L("VatTuTheoXe_Search"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTuTheoXe_Update, L("VatTuTheoXe_Update"));
            group2VatTu.CreateChildPermission(Group2PermissionsConst.Pages_Administration_Group2VatTuTheoXe_Delete, L("VatTuTheoXe_Delete"));
        }

    private static ILocalizableString L(string name)
    {
      return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
    }
  }
}
