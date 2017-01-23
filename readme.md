# Secrets

- [ ] Update `main.hbs` to include a form to add a secret.

When a user adds a secret submit the values via AJAX and render the new secret.

- [ ] Update the templates to include a "Remove" button with an "X"

When a user clicks on "X" use AJAX to remove the secret from the database.

# Updates

# Lies

Create a new collection so that our application can handle secrets and __lies__

The data model for lies should be 

```
{
    statement: "it was the biggest crowd ever",
    truth: "it wasn't."
}
```

What RESTful routes should we use?

- [ ] Update '/' to display both secrets and lies.

Create a new routes file for lies to handle requests to "/lies"

- GET '/lies' Should render all lies as HTML
- GET '/lies/new' should display a form to create a new lie
- POST '/lies' should insert a new lie then redirect to "/lies"

# Bonus

Browsers can only do GET and POST. So we're limited in REST conventions to only use AJAX
if we want to use PUT or DELETE.

- GET '/lies/:id/edit' should display a prepopulated form to update a resource
- PUT '/lies/:id'
- DELETE '/lies/:id'

If we want to fake it we can use an express module called "Method Override"

Can you send PUT and DELETE methods using a query value? 

https://github.com/expressjs/method-override#override-using-a-query-value
