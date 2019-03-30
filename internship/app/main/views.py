from . import main
from flask import render_template, session, request, redirect, url_for, abort, current_app, flash
from flask_login import login_user, logout_user, login_required, current_user
from .stepik_auth import StepicAgent, stepic_oauth
from .models import Teacher, Student, Course

# вход (через Stepik)
@main.route('/login/', methods = ['GET'])
def login():
    return stepic_oauth.authorize(callback=url_for('.authorized', _external=True))


# выход
@main.route('/logout/', methods = ['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('.index'))


# авторизация
@main.route('/authorized/', methods = ['GET', 'POST'])
def authorized():
    print(request.args)
    if request.args.get('code') is None:
        abort(404)

    response = stepic_oauth.authorized_response()
    try:
        token = response['access_token']
    except:
        abort(404)
    session['token'] = token
    stepic_agent = StepicAgent(token)
    try:
        name, avatar, stepic_id = stepic_agent.get_profile_info()
    except:
        abort(404)

    # session['stepic_id'] = stepic_id
    # session['avatar_url'] = avatar

    teacher = Teacher.objects(stepic_id=stepic_id).first()
    if teacher is None:
        return redirect(url_for('.index'))
    else:
        login_user(teacher)
        return redirect(url_for('.courses'))


# главная
@main.route('/', methods=['GET'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('.courses'))
    else:
        return render_template("main/index.html")
