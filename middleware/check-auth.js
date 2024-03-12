// middleware/check-auth.js
export default function ({ route, store, redirect }) {
  // console.log(route.name);
  if (route.name === 'user-login' || route.name === 'maintaince') {
    return;
  }
  // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!store.state.auth.loggedIn) {
    return redirect('/maintaince');
  }
}
  