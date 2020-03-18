const formCreateUser = document.querySelector('.formCreateUser');
const formLogin = document.querySelector('.formLogin');

formCreateUser.addEventListener('submit', event => {
   event.preventDefault();
   const {
      formCreateUser__name,
      formCreateUser__lastName,
      formCreateUser__userName,
      formCreateUser__password,
      formCreateUser__type
   } = event.target.elements;
   const user = {
      userName: formCreateUser__userName.value,
      name: formCreateUser__name.value,
      lastName: formCreateUser__lastName.value,
      password: formCreateUser__password.value,
      type: formCreateUser__type.value
   };
   console.log(user);
   fetch('http://localhost:3000/users/signup', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(data => data.json())
      .then(user => {
         formCreateUser.reset();
         console.log(user);
      });
});

formLogin.addEventListener('submit', event => {
   event.preventDefault();
   const button = event.target.ownerDocument.activeElement.name;
   const { formLogin__userName, formLogin__password } = event.target.elements;
   const user = {
      userName: formLogin__userName.value,
      password: formLogin__password.value
   };
   switch (button) {
      case 'formLogin__login':
         fetch('http://localhost:3000/users/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
         })
            .then(data => {
               if (data.status === 200) {
                  return data.json();
               } else return null;
            })
            .then(user => {
               if (user) {
                  sessionStorage.setItem('token', user.token);
                  formLogin.reset();
                  alert('Log in');
               } else {
                  alert('Check user or password');
               }
            });
         break;
      case 'formLogin__logout':
         sessionStorage.clear();
         alert('Log out');
         break;
      default:
         break;
   }
});
