# django-hooks[![Build Status](https://travis-ci.org/nitely/django-hooks.png)](https://travis-ci.org/nitely/django-hooks) [![Coverage Status](https://coveralls.io/repos/nitely/django-hooks/badge.png?branch=master)](https://coveralls.io/r/nitely/django-hooks?branch=master)

A modular plugin system for django apps.

There are 3 kinds of hooks:

* TemplateHook: Third-party apps will be able to insert their own code (text/html) into an app template.
* FormHook: Third-party apps will be able to insert Forms in an app view.
* ~~ViewHook~~: This is deprecated in favor of `FormHook`
* SignalHook: Connect or emit a signal by its name/id. This is the same as Django signals
except that they don't need to be pre-defined.

**Tested** in Django 1.8 LTS; Python 2.7, 3.4, 3.5

## Why?

Let's say we want to render contextual information beside a record allocated in `my_main_app`.
This extra information can be provided by some third-party application: Notes, Attachments,
Comments, Followers, etc.

Adding an `{% include %}` tag to our `my_record.html` is not possible cause we don't know what
to render beforehand (a note? a list of comments?) or even if any of those applications is
installed for our case/customer/project.

We can create a TemplateHook `{% hook 'my_contextual_info' %}` where we delegate the rendering and
content retrieval to the hooked app(s). By doing so, `my_record.html` doesn't need to be touched anymore,
no need to add more templatetags to `{% load %}` and we also make it easily reusable.

## Configuration

1. Add `hooks` to your *INSTALLED_APPS*. This is required by `TemplateHook`.

## Usage

### TemplateHook

Adding a hook-point in `main_app`'s template:

```html
# my_main_app/templates/_base.html

{% load hooks_tags %}

<!DOCTYPE html>
<html>
  <head>
    #...
    
    {% hook 'within_head' %}
   
    #...
  </head>
</html>
```

> Here we are adding a *hook-point* called `within_head` where *third-party*
> apps will be able to insert their code.

Creating a hook listener in a `third_party_app`:

```python
# third_party_app/template_hooks.py

from django.template.loader import render_to_string
from django.utils.html import mark_safe, format_html


# Example 1
def css_resources(context, *args, **kwargs):
    return mark_safe(u'<link rel="stylesheet" href="%s/app_hook/styles.css">' % settings.STATIC_URL)


# Example 2
def user_about_info(context, *args, **kwargs):
    user = context['request'].user
    return format_html(
        "<b>{name}</b> {last_name}: {about}",
        name=user.first_name,
        last_name=user.last_name,
        about=mark_safe(user.profile.about_html_field)  # Some safe (sanitized) html data.
    )


# Example 3
def a_more_complex_hook(context, *args, **kwargs):
    # If you are doing this a lot, make sure to keep your templates in memory (google: django.template.loaders.cached.Loader)
    return render_to_string(
        template_name='templates/app_hook/head_resources.html',
        context_instance=context
    )


# Example 4
def an_even_more_complex_hook(context, *args, **kwargs):
    articles = Article.objects.all()
    return render_to_string(
        template_name='templates/app_hook/my_articles.html',
        dictionary={'articles': articles, },
        context_instance=context
    )
```

Registering a hook listener in a `third_party_app`:

```python
# third_party_app/apps.py

from django.apps import AppConfig


class MyAppConfig(AppConfig):

    name = 'myapp'
    verbose_name = 'My App'

    def ready(self):
        from hooks.templatehook import hook
        from third_party_app.template_hooks import css_resources

        hook.register("within_head", css_resources)
```

> Where to register your hooks:
> 
> Use `AppConfig.ready()`,
> [docs](https://docs.djangoproject.com/en/1.8/ref/applications/#django.apps.AppConfig.ready),
> [example](http://chriskief.com/2014/02/28/django-1-7-signals-appconfig/)

### FormHook

Creating a hook-point:

```python
# main_app/formhooks.py

from hooks.formhook import Hook

MyFormHook = Hook()
UserFormHook = Hook(providing_args=['user'])
```

Adding a hook-point to the main app view:

```python
# main_app/views.py

from main_app import formhooks


# Example 1
def my_view(request):
    if request.method == 'POST':
        myform = MyForm(data=request.POST)
        hook = formhooks.MyFormHook(data=request.POST)

        if all([myform.is_valid(), hook.is_valid()]):  # Avoid short-circuit
            myform.save()
            hook.save()
            redirect('/')
    else:
        myform = MyForm()
        hook = formhooks.MyFormHook()

    return response({'myform': myform, 'hook_form': hook}) #...


# Example 2
def user_profile_update(request):
    if request.method == 'POST':
        user_form = UserForm(data=request.POST, instance=request.user)

        # Hook listeners will receive the user and populate the
        # initial data (or instance if a ModelForm is used) accordingly,
        # or maybe even query the data base.
        hook = formhooks.UserFormHook(user=request.user, data=request.POST)

        if all([user_form.is_valid(), hook.is_valid()]):  # Avoid short-circuit
            new_user = user_form.save()
            hook.save(new_user=new_user)  # They may receive extra parameter when saving
            redirect('/')
    else:
        user_form = MyForm(instance=request.user)
        hook = formhooks.UserFormHook(user=request.user)

    return response({'user_form': user_form, 'hook_form': hook}) #...
```

Displaying the forms:

```html
# main_app/templates/my_view.html

{% extends "main_app/_base.html" %}

{% block title %}My forms{% endblock %}

{% block content %}
    <h1 class="headline">My forms</h1>

    <form action="." method="post">
        {% csrf_token %}
        {{ myform }}

        {% for f in hook_form %}
            {{ f }}
        {% endfor %}

        <input type="submit" value="Save" />
    </form>
{% endblock %}
```

Creating a hook-listener in a third-party app:

> Hooks listeners are just regular django forms or model forms

```python
# third_party_app/forms.py

from django import forms
from third_party_app.models import MyUserExtension


class MyUserExtensionForm(forms.ModelForm):

    class Meta:
        model = MyUserExtension
        fields = ("gender", "age", "about")

    def __init__(user=None, *args, **kwargs):
        try:
           instance = MyUserExtension.objects.get(user=user)
        except MyUserExtension.DoesNotExist:
           instance = None

        kwargs['instance'] = instance
        super(MyUserExtensionForm, self).__init__(*args, **kwargs)

    def save(new_user, *args, **kwargs):
        self.instance.user = new_user
        super(MyUserExtensionForm, self).save(*args, **kwargs)


class MyRegularForm(forms.Form):
    """"""
    # ...
```

Registering a hook-listener:

```python
# third_party_app/apps.py

from django.apps import AppConfig


class MyAppConfig(AppConfig):

    name = 'myapp'
    verbose_name = 'My App'

    def ready(self):
        from main_app.formhooks import MyFormHook, UserFormHook
        from third_party_app.forms import MyRegularForm, MyUserExtensionForm

        MyFormHook.register(MyRegularForm)
        UserFormHook.register(MyUserExtensionForm)
```

### ~~ViewHook~~

> Warning!
>
> This hook is deprecated in favor of `FormHook` as it solves the same issue in a more saner way.

### SignalHook

> Best practices:
> * Always *document* the signals the app will send, include the parameters the receiver should handle.
> * Send signals from views, only.
> * Avoid sending signals from plugins.
> * Try to avoid signal-hell in general. It's better to be *explicit* and call the
> functions that would've handle the signal otherwise. Of course, this won't be
> possible when there are plugins involved.

Connecting a hook-listener:

```python
# third_party_app/urls.py

from third_party_app.viewhooks import myhandler
from hooks import signalhook

signalhook.hook.connect("my-signal", myhandler)
```

Sending a signal:

```python
# send from anywhere, app-hook, main-app... view, model, form...

from hooks import signalhook

responses = signalhook.hook.send("my-signal", arg_one="hello", arg_two="world")
responses = signalhook.hook.send("another-signal")
```

> `SignalHook` uses django signals under the hood, so you can do pretty much the same things.

## License

MIT
