# -*- coding: utf-8 -*-
"""Public section, including homepage and signup."""
from flask import (Blueprint, request, render_template, flash, url_for,
                    redirect, session)
from flask.ext.login import login_user, login_required, logout_user

from brome.core.model.user import User
from brome.webserver.extensions import login_manager
from brome.webserver.public.forms import LoginForm
from brome.webserver.admin.forms import RegisterForm
from brome.webserver.utils import flash_errors
from brome.webserver.extensions import db

blueprint = Blueprint('public', __name__, static_folder="../static")

@login_manager.user_loader
def load_user(id):
    return db.session.query(User).get(int(id))

@blueprint.route("/", methods=["GET", "POST"])
def home():
    form = LoginForm(request.form)
    # Handle logging in
    if request.method == 'POST':
        if form.validate_on_submit():
            login_user(form.user)
            flash("You are logged in.", 'success')
            redirect_url = request.args.get("next") or url_for("public.home")
            return redirect(redirect_url)
        else:
            flash_errors(form)
    return render_template("public/home.html", form=form)

@blueprint.route('/logout/')
@login_required
def logout():
    logout_user()
    flash('You are logged out.', 'info')
    return redirect(url_for('public.home'))

@blueprint.route("/register/", methods=['GET', 'POST'])
def register():
    
    closed_registration = blueprint.app.config.get('CLOSED_REGISTRATION', False)

    form = RegisterForm(request.form, csrf_enabled=False, app = blueprint.app)
    if form.validate_on_submit():
        new_user = User(username=form.username.data,
                        email=form.email.data,
                        password=form.password.data
                        )

        db.session.add(new_user)
        db.session.commit()

        flash("Thank you for registering. You can now log in.", 'success')

        return redirect(url_for('public.home'))
    else:
        flash_errors(form)

    return render_template('public/register.html', form=form, closed_registration = closed_registration)

@blueprint.route("/about/")
def about():
    form = LoginForm(request.form)
    return render_template("public/about.html", form=form)
