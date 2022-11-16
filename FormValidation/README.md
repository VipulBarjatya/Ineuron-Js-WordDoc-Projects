# HTML FORM VALIDATION

![Form Image](./form.png)

## Types of Form Validation

- **Built-in form validation** : These are some validation attributes provided within HTML5 itself. This validation generally doesn't require much JavaScript.

- **JavaScript**: This validation is coded using JavaScript. This validation is completelt customizable.

### Using Built-in form validation

Following are the HTML5 form controls, which i have used in my form validation:

- **required** : Used this to make fields required.

- **minlength** and **maxlength**: Used this to specify minimum length of characters required in field name

- **pattern**: Used this form control to validate with the phone number and password

### Using JavaScript

-**e.preventDefault()**: Firstly we need to tackle the default behavior of form which is to refresh the page, what is happening behind the scene is it is trying to send the data to a server somewhere, but because we are not properly doing anything with that request, it is just refreshing the page. preventDefault() prevent the form to submit.

- **Constraint validation process**: Constraint validation is done through the Constraint validation API. It can be performed by a call to the checkValidity() method, which return boolean value whether the element's value passes its constraints.

- **Validating Manually**: Manual Validation performed i.e, checking if passwords are matching or not.

### Displaying message

Displaying whether the form is submitted or is their any problem with filled data
