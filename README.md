Author : Kenedy Nopriansyah

Email : kenedinovriansyah@gmail.com

Youtube: https://www.youtube.com/@learnwithkenedy

# Employee Management

Technical assessment project for Backoffice Frontend.

## Environment

- Node.js >= 16.x
- Angular CLI 16.x
- npm 9.x+

## How to Run

```bash
nvm use
npm install
ng serve
```

Open `http://localhost:4200` in the browser.

## Login Credentials

- **Username:** admin
- **Password:** admin

## Pages

1. **Login Page** — authentication with hardcoded username/password
2. **Employee List Page** — table with sorting, searching (name/email + group), pagination, page size selector, add/edit/delete
3. **Add Employee Page** — form with mandatory fields, email validation, date picker, salary number input, searchable group dropdown
4. **Employee Detail Page** — formatted employee data (salary in IDR), back to list with preserved search state

## Build

```bash
ng build
```
