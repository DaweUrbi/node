## EJS Templates

Used for making modularized HTML within a Node.js backend.

- Separation of concerns
- Write HTML without formatting as a string
- Sprinkle in some JavaScript logic / expressions if/where you need to

```
npm install ejs
```

```js
// set the view engine to ejs
app.set("view engine", "ejs");
```

```js
// render `home.ejs`
app.get("/", (req, res) => {
  res.render("home");
});
```

```html
<!-- views/home.ejs -->
<h1>Home</h1>
```

## Making it dynamic

```js
// render `home.ejs`
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});
```

```html
<!-- views/home.ejs -->
<h1><%= title %></h1>
```

## Partials

```html
<!-- views/home.ejs -->
<h1><%= title %></h1>
<ul>
  <% users.forEach(function(user){ %> <%- include('user', {user: user}); %> <%
  }); %>
</ul>
```

## Exercise

> Instructions are in the `exercise.js` file.