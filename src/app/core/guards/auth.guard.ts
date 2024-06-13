import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('loginToken');
    const role = localStorage.getItem('userRole'); // Retrieve the role from localStorage

    // Allow everyone to access the following routes
    if (state.url === '/' || state.url.includes('list-product') || state.url.includes('detail-product')) {
      return true;
    }

    // Require login and 'USER' role for the Cart page
    if (state.url.includes('cart')) {
      if (!token) {
        console.log("Access denied. Please log in.");
        this.router.navigate(['/auth/login']);
        return false;
      }
      
      if (role !== 'USER') {
        console.log("Access denied. Only users can access the cart.");
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    }

    // Redirect based on role if accessing login or other routes
    if (state.url.includes('login') || state.url.includes('auth')) {
      if (token) {
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
        return false;
      }
      return true;
    }

    return true;
  }
}


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root' 
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): 
//     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const token = localStorage.getItem('loginToken'); 

//     if (state.url.includes('home') && !token) {
//       console.log("Không thể vào trang này mà không đăng nhập");
//       this.router.navigate(['/login']); 
//       return false;
//     }
//     if (token) {
//       console.log("Đã kiểm duyệt vào trang");
//       return true;
//     } else {
//       console.log("Không có quyền truy cập, vui lòng đăng nhập");
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
  
// }
// Trong AuthGuard