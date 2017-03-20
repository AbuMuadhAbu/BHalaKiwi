
select top 5 OfferName,a.StartDate,a.EndDate,c.CompanyName as Outlet,(select d.CompanyName from tblUsers d where d.UserID= c.CreateBy) Restaurant,CounT(b.ClaimID) AvailCount
 from tblOffers a inner join tblOfferClaimDetails b on a.OfferID=b.OfferID inner join tblUsers c on c.UserID=a.UserID
 group by OfferName,a.StartDate,a.EndDate,c.CompanyName,c.CreateBy

 select top 5 c.BranchArea as BranchLocation,CounT(a.OfferID) TotalOffers,Count(distinct a.UserID) TotalOutlet,COunt(distinct c.CreateBy) TotalRestaurant
 from tblOffers a inner join tblUsers c on c.UserID=a.UserID
 group by c.BranchArea

 select top 5 (select d.CompanyName from tblUsers d where d.UserID= c.CreateBy) Restaurant,CounT(a.OfferID) TotalOffers,Count(distinct a.UserID) TotalOutlet
 from tblOffers a inner join tblUsers c on c.UserID=a.UserID
 group by c.CreateBy

 select Count(UserID) RestaurantUsers from tblUsers where RoleID=2 and IsActive=1
 select Count(UserID) MobileUsers from tblUsers where RoleID=4 and IsActive=1